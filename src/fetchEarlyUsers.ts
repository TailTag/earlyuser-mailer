import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();
const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;

// Initialize Supabase client with service role credentials
const supabase = createClient(
  SUPABASE_URL as string,
  SUPABASE_SERVICE_ROLE_KEY as string
);

// Early user type
interface EarlyUserType {
  id: string;
  email: string;
  created_at: string;
}

/**
 * Retrieves a list of early users from Supabase and filters them based on
 * subscription criteria. The criteria are as follows:
 * - The user has an inactive subscription status
 * - The user is not already an early user pro member
 * - The user does not have a lifetime free or Pro subscription
 *
 * @returns An array of email addresses of the early users that meet the criteria
 */
async function getEarlyUserEmails(): Promise<string[]> {
  const recipients: string[] = [];

  try {
    // Fetch users from Supabase using the Admin API - list all users
    const { data: users, error } = await supabase.auth.admin.listUsers({});

    const EarlyUsers: EarlyUserType[] = [];
    for (const user of users.users as EarlyUserType[]) {
      EarlyUsers.push({
        id: user.id,
        email: user.email,
        created_at: user.created_at,
      });
    }

    // Sort users by creation date
    EarlyUsers.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB.getTime() - dateA.getTime();
    });

    // Earliest users are at the top
    EarlyUsers.reverse();

    // Get the first 269 early users
    const earlyUsers = EarlyUsers.slice(0, 269);

    if (error) {
      throw new Error(error.message);
    }

    // For each user, check their subscription status by making the GET request
    for (const user of earlyUsers) {
      const { id, email } = user;

      try {
        // Make GET request to the subscription endpoint for each user
        const response = await axios.get(
          `https://tailtag.link/api/subscription/${id}`
        );
        const { subscription_status, is_early_user, has_pro_access } =
          response.data;

        // If criteria are met, add the email to the recipients array
        if (
          subscription_status === "inactive" &&
          !is_early_user &&
          !has_pro_access
        ) {
          recipients.push(email || "no-email");
        }
      } catch (error) {
        console.error(
          `Error fetching subscription data for user ${id}:`,
          error
        );
      }
    }
  } catch (error) {
    console.error("Error fetching users from Supabase:", error);
  }

  // Return the array of recipient emails
  return recipients;
}

export default getEarlyUserEmails;

/**
 * Example ussage:
getEarlyUserEmails().then((emails) => {
  console.log("Eligible users:", emails);
});
 */

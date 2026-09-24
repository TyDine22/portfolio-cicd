import type { APIRoute } from "astro";
import { z } from "astro/zod";
import { Resend } from "resend";

/*
 * This route must run on the server.
 * It cannot be generated as a static file.
 */
export const prerender = false;


const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters.")
    .max(80, "Name is too long."),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(150, "Email address is too long."),

  subject: z
    .string()
    .trim()
    .min(3, "Subject must contain at least 3 characters.")
    .max(120, "Subject is too long."),

  message: z
    .string()
    .trim()
    .min(10, "Message must contain at least 10 characters.")
    .max(5000, "Message is too long."),

  /*
   * Simple honeypot.
   * Normal users never fill this field.
   */
  website: z
    .string()
    .max(0)
    .optional(),
});


export const POST: APIRoute = async ({ request }) => {

  /*
   * Check required server configuration.
   */
  const apiKey =
    import.meta.env.RESEND_API_KEY;

  const contactEmail =
    import.meta.env.CONTACT_TO_EMAIL;

  const fromEmail =
    import.meta.env.CONTACT_FROM_EMAIL;


  if (
    !apiKey ||
    !contactEmail ||
    !fromEmail
  ) {

    console.error(
      "Missing contact email environment variables."
    );

    return Response.json(
      {
        success: false,
        message:
          "The contact form is temporarily unavailable.",
      },
      {
        status: 500,
      }
    );

  }


  /*
   * Validate request type.
   */
  const contentType =
    request.headers.get("content-type");


  if (
    !contentType?.includes(
      "application/json"
    )
  ) {

    return Response.json(
      {
        success: false,
        message:
          "Invalid request format.",
      },
      {
        status: 415,
      }
    );

  }


  /*
   * Parse request.
   */
  let body: unknown;


  try {

    body =
      await request.json();

  } catch {

    return Response.json(
      {
        success: false,
        message:
          "Invalid request body.",
      },
      {
        status: 400,
      }
    );

  }


  /*
   * Validate form data.
   */
  const result =
    contactSchema.safeParse(body);


  if (!result.success) {

    return Response.json(
      {
        success: false,

        message:
          "Please check the form and try again.",

        errors:
          result.error.flatten()
            .fieldErrors,
      },
      {
        status: 400,
      }
    );

  }


  const {
    name,
    email,
    subject,
    message,
  } = result.data;


  /*
   * Create Resend client.
   */
  const resend =
    new Resend(apiKey);


  /*
   * Send email.
   */
  const { data, error } =
    await resend.emails.send({

      from: fromEmail,

      to: [
        contactEmail,
      ],

      replyTo:
        email,

      subject:
        `[Portfolio] ${subject}`,

      text: `
New portfolio contact message

Name:
${name}

Email:
${email}

Subject:
${subject}

Message:
${message}
      `.trim(),

    });


  /*
   * Resend rejected the request.
   */
  if (error) {

    console.error(
      "Resend error:",
      error
    );

    return Response.json(
      {
        success: false,

        message:
          "Unable to send your message right now. Please try again later.",
      },
      {
        status: 500,
      }
    );

  }


  /*
   * Success.
   */
  console.log(
    "Contact email sent:",
    data?.id
  );


  return Response.json(
    {
      success: true,

      message:
        "Your message has been sent successfully.",
    },
    {
      status: 200,
    }
  );

};
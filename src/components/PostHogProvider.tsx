"use client";

import { useEffect } from "react";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      person_profiles: "always", // or 'always' to create profiles for anonymous users as well
      defaults: "2025-05-24",
      loaded: function (ph) {
        if (process.env.ENVIRONMENT == "development") {
          ph.opt_out_capturing(); // opts a user out of event capture
          ph.set_config({ disable_session_recording: true });
        }
      },
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./githubMarkdown.css";

const inter = Inter({ subsets: ["latin"] });

// config
import config from "../../richtpl.config";

// next-intl (i18n)
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";

// next-theme
import { ThemeProvider } from "@/components/provider/theme";

// ui
import { TooltipProvider } from "@/components/ui/tooltip";
// import Header from "@/components/nav/header";
// import Footer from "@/components/nav/footer";
// import { TopNewsContent } from "@/components/nav/news";
import { Toaster } from "react-hot-toast";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const t = await getTranslations({ lang, namespace: "Metadata" });

  return {
    title: {
      template: `%s | ${
        config.themeConfig?.metadata?.title || config.title || t(`title`)
      }`,
      default: `${
        config.themeConfig?.metadata?.title || config.title || t(`title`)
      }`,
    },
    description: `${
      config.themeConfig?.metadata?.title ||
      config.description ||
      t(`description`)
    }`,
    referrer:
      config.themeConfig?.metadata?.referrer || "origin-when-cross-origin",
    keywords: config.themeConfig?.metadata?.keywords || ["Vercel", "Next.js"],
    authors: config.themeConfig?.metadata?.authors || [
      { name: "Fun117", url: "https://fun117.dev" },
    ],
    creator: config.themeConfig?.metadata?.creator || "Fun117",
    icons: config.favicon || "/favicon.ico",
    generator: config.themeConfig?.metadata?.generator || "Next.js",
    publisher: config.themeConfig?.metadata?.publisher || "Vercel",
    robots: config.themeConfig?.metadata?.robots || "follow, index",
    metadataBase:
      config.themeConfig?.metadata?.metadataBase || new URL(config.url),
    openGraph: {
      type: "website",
      url: config.url,
      siteName:
        config.themeConfig?.metadata?.openGraph?.siteName ||
        config.title ||
        t(`title`),
      title:
        config.themeConfig?.metadata?.openGraph?.title ||
        config.title ||
        t(`title`),
      description:
        config.themeConfig?.metadata?.openGraph?.description ||
        config.description ||
        t(`description`),
      images:
        config.themeConfig.metadata?.openGraph?.images ||
        config.themeConfig.image,
      locale: config.themeConfig?.metadata?.openGraph?.locale || "ja-JP",
    },
    twitter: {
      card: "summary_large_image",
      site: `@${
        config.themeConfig?.metadata?.twitter?.site ||
        config.themeConfig?.metadata?.creator ||
        "Fun_117"
      }`,
      title:
        config.themeConfig?.metadata?.twitter?.title ||
        config.title ||
        t(`title`),
      description:
        config.themeConfig?.metadata?.twitter?.description ||
        config.description ||
        t(`description`),
      creator: `@${
        config.themeConfig?.metadata?.twitter?.creator ||
        config.themeConfig?.metadata?.creator ||
        "Fun_117"
      }`,
      images:
        config.themeConfig.metadata?.twitter?.images ||
        config.themeConfig.image,
    },
    ...config.themeConfig?.metadata,
  };
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.className} relative w-full h-full min-h-dvh overflow-x-clip`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme={config.themeConfig.colorMode.defaultMode}
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <TooltipProvider>
              <main className="w-full h-full min-h-[calc(100dvh-64px)]">
                {children}
              </main>
              <Toaster
                position="bottom-right"
                reverseOrder={false}
                toastOptions={{
                  className:
                    "border bg-neutral-50 dark:bg-neutral-950 text-black dark:text-white",
                }}
              />
            </TooltipProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

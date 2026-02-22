import Footer from "@/components/organisms/footer";
import Header from "@/components/organisms/header/header";
import SmoothScroll from "@/components/organisms/smoothScroll";
import { getLayoutRelatedData } from "@/queries/global";
import { mergeClassNames } from "@flight-digital/flightdeck/helpers";
import ThemeClasses from "@flight-digital/flightdeck/pebbles/themeClasses";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./style.linaria.global";
import KlaviyoProvider from "@/components/organisms/klaviyoProvider";

// Replace with your fonts, also update the font-family in the style.linaria.global.tsx file
export const montserrat = Montserrat({
  weight: ["400", "600"],
});

export const playfair_display = Playfair_Display({
  weight: ["400"],
});

export default async function Layout({ children }: LayoutProps<"/">) {
  const navigation = await getLayoutRelatedData();

  return (
    <div className={mergeClassNames("global-layout", montserrat.className)}>
      <ThemeClasses data={navigation?.theme?.classNames as any} />
      <SmoothScroll />
      <Header data={navigation.header} />
      <KlaviyoProvider>
        <main>{children}</main>
      </KlaviyoProvider>
      <Footer data={navigation.footer} socialMedias={navigation.settings?.socialMedias} />
    </div>
  );
}

import RevealObserver from "@/components/ui/RevealObserver";

/** Campaign landing pages: no corporate header/footer, each page brings its own. */
export default function LandingLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      {children}
      <RevealObserver />
    </>
  );
}

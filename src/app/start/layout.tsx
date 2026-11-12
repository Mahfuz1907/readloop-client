import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

export default function StartLayout({ children }: LayoutProps<"/">) {
  return (
    <body className="min-h-full flex flex-col">
      <Navbar />
      {children}
      <Footer />
    </body>
  );
}

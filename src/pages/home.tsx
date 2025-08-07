import Header from "@/components/Layouts/Header";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <Header type="home" />
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-border/40 bg-muted/50 px-4 py-2 text-sm mb-8">
            <Star className="h-4 w-4 mr-2 text-yellow-500" />
            <span className="text-muted-foreground">
              Trusted by 10,000+ teams worldwide
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6 tracking-tight">
            Atur Pekerjaan Anda
            <span className="block bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">
              Tidak Seperti Sebelumnya
            </span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            TugasKu membantu Anda mengelola tugas, berkolaborasi dengan tim, dan
            mencapai tujuan lebih cepat. Sederhana, canggih, dan dirancang
            dengan indah.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6">
                Registrasi
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-lg px-8 py-6"
              >
                Login
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
export default HomePage;

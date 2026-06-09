import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
} from "react";
import {
  Menu,
  X,
  MapPin,
  PhoneCall,
  Mail,
  ChevronRight,
  Star,
  Clock,
  IndianRupee,
  Image as ImageIcon,
  Users,
  ShieldCheck,
  HeartHandshake,
  Map,
  Facebook,
  Instagram,
  Twitter,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const ConfigContext = createContext();
export const useConfig = () => useContext(ConfigContext);

const MOCK_TOURS = [
  {
    id: 1,
    title: "Religious Chardham Yatra",
    destination: "Uttarakhand",
    duration: "11 Days / 10 Nights",
    price: 25000,
    type: "Religious",
    rating: 4.8,
    image:
      "https://www.travelshrine.com/wp-content/uploads/2024/04/Chardham-Yatra-Package-from-Delhi.webp",
    inclusions: ["Hotels", "Meals", "Transport", "Guide"],
  },
  {
    id: 2,
    title: "Golden Triangle Tour",
    destination: "Delhi, Agra, Jaipur",
    duration: "6 Days / 5 Nights",
    price: 18500,
    type: "Family",
    rating: 4.7,
    image:
      "https://www.goldenindiatravels.com/images/blog/golden-triangle-tour.webp",
    inclusions: ["Hotels", "Breakfast", "AC Cab", "Sightseeing"],
  },
  {
    id: 3,
    title: "Manali Snow Adventure",
    destination: "Himachal Pradesh",
    duration: "5 Days / 4 Nights",
    price: 12000,
    type: "Weekend",
    rating: 4.9,
    image:
      "https://www.rajasthancab.com/uploads/blog/1744623641-blog-image.webp",
    inclusions: ["Resort", "Meals", "Volvo Bus", "Snow Activities"],
  },
  {
    id: 4,
    title: "Goa Beach Holiday",
    destination: "Goa",
    duration: "4 Days / 3 Nights",
    price: 15000,
    type: "Weekend",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80",
    inclusions: ["Beach Resort", "Breakfast", "Airport Transfer"],
  },
  {
    id: 5,
    title: "Kashi Vishwanath Darshan",
    destination: "Varanasi",
    duration: "3 Days / 2 Nights",
    price: 8500,
    type: "Religious",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80",
    inclusions: ["Hotel", "Temple VIP Pass", "Boat Ride"],
  },
  {
    id: 6,
    title: "Kerala Backwaters",
    destination: "Kerala",
    duration: "7 Days / 6 Nights",
    price: 28000,
    type: "Custom",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80",
    inclusions: ["Houseboat", "All Meals", "Ayurvedic Spa"],
  },
];

const MOCK_GALLERY = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&q=80",
    category: "Religious",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1626714486981-061099fbc30c?auto=format&fit=crop&q=80",
    category: "Hill Stations",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80",
    category: "Religious",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1593693397690-362cb9666c6b?auto=format&fit=crop&q=80",
    category: "Family Trips",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1534143003051-2442af103f6f?auto=format&fit=crop&q=80",
    category: "Adventure",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80",
    category: "Hill Stations",
  },
];

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyle =
    "inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg transition-all duration-300";
  const variants = {
    primary:
      "bg-orange-600 text-grey hover:bg-orange-700 shadow-lg hover:shadow-orange-500/30",
    secondary: "bg-teal-800 text-grey hover:bg-teal-900 shadow-lg",
    outline: "border-2 border-orange-600 text-orange-600 hover:bg-orange-50",
  };
  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const SectionHeading = ({ title, subtitle, centered = true }) => (
  <div className={`mb-12 ${centered ? "text-center" : ""}`}>
    <h4 className="text-orange-600 font-bold tracking-wider uppercase text-sm mb-2">
      {subtitle}
    </h4>
    <h2 className="text-3xl md:text-4xl font-extrabold text-teal-900">
      {title}
    </h2>
    <div
      className={`h-1 w-20 bg-orange-500 mt-4 ${centered ? "mx-auto" : ""} rounded-full`}
    ></div>
  </div>
);

const Navbar = ({ currentPage, navigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { contact } = useConfig();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Combo Tours", id: "tours" },
    { name: "Gallery", id: "gallery" },
    { name: "About", id: "about" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("home")}
          >
            <MapPin
              className={`h-8 w-8 ${isScrolled ? "text-orange-600" : "text-white/40"}`}
            />
            <span
              className={`ml-2 text-2xl font-black tracking-tight ${isScrolled ? "text-teal-900" : "text-grey"}`}
            >
              SHREE BALAJI<span className="text-orange-500"> TRAVELS</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => navigate(link.id)}
                className={`text-sm font-bold uppercase tracking-wide transition-colors ${
                  currentPage === link.id
                    ? "text-orange-500"
                    : isScrolled
                      ? "text-teal-900 hover:text-orange-600"
                      : "text-grey/90 hover:text-grey"
                }`}
              >
                {link.name}
              </button>
            ))}
            <a
              href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent('Hello Sir, I would like to know more about your tours.')}`}
              // target="_blank"
              rel="noreferrer"
              className="bg-green-500 text-grey px-5 py-2 rounded-full font-bold text-sm shadow-lg hover:bg-green-600 transition-colors flex items-center"
            >
              <PhoneCall className="w-4 h-4 mr-2" /> Book Now
            </a>
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={isScrolled ? "text-teal-900" : "text-grey"}
            >
              {mobileMenuOpen ? (
                <X className="h-7 w-7" />
              ) : (
                <Menu className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 animate-fade-in">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  navigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-4 rounded-md text-base font-bold uppercase ${
                  currentPage === link.id
                    ? "text-orange-600 bg-orange-50"
                    : "text-teal-900 hover:bg-gray-50"
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

const Footer = ({ navigate }) => {
  const { contact } = useConfig();
  return (
    <footer className="bg-teal-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <MapPin className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-2xl font-black tracking-tight">
                SHREE BALAJI<span className="text-orange-500"> TRAVELS</span>
              </span>
            </div>
            <p className="text-teal-100 mb-6 leading-relaxed">
              Your trusted travel partner for unforgettable journeys. We
              specialize in religious tours, family holidays, and custom weekend
              getaways across India.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-teal-900 p-2 rounded-full hover:bg-orange-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-teal-900 p-2 rounded-full hover:bg-orange-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-teal-900 p-2 rounded-full hover:bg-orange-500 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-teal-800 pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {["home", "tours", "gallery", "about", "contact"].map((page) => (
                <li key={page}>
                  <button
                    onClick={() => navigate(page)}
                    className="text-teal-100 hover:text-orange-400 capitalize transition-colors flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 mr-2" />{" "}
                    {page === "tours" ? "Combo Tours" : page}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-teal-800 pb-2 inline-block">
              Top Destinations
            </h3>
            <ul className="space-y-3">
              <li className="text-teal-100 hover:text-orange-400 cursor-pointer flex items-center">
                <ChevronRight className="w-4 h-4 mr-2" /> Chardham Yatra
              </li>
              <li className="text-teal-100 hover:text-orange-400 cursor-pointer flex items-center">
                <ChevronRight className="w-4 h-4 mr-2" /> Golden Triangle
              </li>
              <li className="text-teal-100 hover:text-orange-400 cursor-pointer flex items-center">
                <ChevronRight className="w-4 h-4 mr-2" /> Himachal Packages
              </li>
              <li className="text-teal-100 hover:text-orange-400 cursor-pointer flex items-center">
                <ChevronRight className="w-4 h-4 mr-2" /> Kashmir Valleys
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-teal-800 pb-2 inline-block">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-teal-100">{contact.address}</span>
              </li>
              <li className="flex items-center">
                <PhoneCall className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                <span className="text-teal-100">{contact.phone}</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                <span className="text-teal-100">{contact.email}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-teal-900 pt-8 text-center text-teal-300 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Shree Balaji Travels. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const HomePage = ({ navigate }) => {
  return (
    <div className="animate-fade-in">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80"
            alt="Hero Travel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-teal-900/60 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-teal-950/90"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <span className="block text-orange-400 font-bold tracking-[0.2em] mb-4 uppercase text-sm md:text-base animate-slide-up">
            Explore the unseen world
          </span>
          <h1
            className="text-5xl md:text-7xl font-extrabold text-grey mb-6 leading-tight animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            Your Journey To <br />{" "}
            <span className="text-orange-500">Divine Memories</span>
          </h1>
          <p
            className="text-lg md:text-xl text-teal-50 mb-10 font-light animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Premium travel packages, expert guides, and unforgettable
            experiences across India's most spectacular destinations.
          </p>
          <div
            className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Button onClick={() => navigate("tours")}>Explore Packages</Button>
            <Button
              variant="outline"
              className="border-white text-grey hover:bg-white hover:text-teal-900"
              onClick={() => navigate("contact")}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 relative -mt-10 z-20 rounded-t-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Safe Journey",
                desc: "Highest safety standards for your peace of mind",
              },
              {
                icon: Users,
                title: "Trusted Partner",
                desc: "Over 10,000+ happy travelers across India",
              },
              {
                icon: HeartHandshake,
                title: "Best Deals",
                desc: "Affordable luxury with our exclusive network",
              },
              {
                icon: Clock,
                title: "24/7 Support",
                desc: "Round the clock assistance during your trip",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-xl shadow-gray-100 hover:-translate-y-2 transition-transform duration-300 group"
              >
                <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
                  <feature.icon className="w-8 h-8 text-orange-600 group-hover:text-grey transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-teal-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Popular Destinations"
            subtitle="Top Rated Tours"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_TOURS.slice(0, 3).map((tour) => (
              <div
                key={tour.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-teal-900 flex items-center">
                    <Star className="w-4 h-4 text-orange-500 mr-1 fill-current" />{" "}
                    {tour.rating}
                  </div>
                  <div className="absolute bottom-0 left-0 bg-orange-600 text-grey px-4 py-2 font-bold text-sm rounded-tr-xl">
                    {tour.type}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-teal-900 mb-2">
                        {tour.title}
                      </h3>
                      <p className="text-gray-500 flex items-center text-sm">
                        <MapPin className="w-4 h-4 mr-1 text-orange-500" />{" "}
                        {tour.destination}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="text-teal-900 font-bold text-xl flex items-center">
                      <IndianRupee className="w-5 h-5" />{" "}
                      {tour.price.toLocaleString()}
                    </div>
                    <Button
                      onClick={() => navigate("tours")}
                      variant="outline"
                      className="py-2 px-4 text-sm rounded-full"
                    >
                      Explore
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button onClick={() => navigate("tours")} className="rounded-full">
              View All Packages <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

const ComboToursPage = () => {
  const [filter, setFilter] = useState("All");
  const { contact } = useConfig();
  const categories = ["All", "Religious", "Family", "Weekend", "Custom"];
  const filteredTours =
    filter === "All"
      ? MOCK_TOURS
      : MOCK_TOURS.filter((tour) => tour.type === filter);

  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Our Premium Packages" subtitle="Combo Tours" />

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                filter === cat
                  ? "bg-orange-600 text-grey shadow-md"
                  : "bg-white text-gray-600 hover:bg-orange-50 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative h-56">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-teal-900 flex items-center shadow-sm">
                  <Clock className="w-4 h-4 text-orange-500 mr-1" />{" "}
                  {tour.duration.split("/")[0]}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-teal-900 mb-2">
                  {tour.title}
                </h3>
                <p className="text-gray-500 flex items-center text-sm mb-4">
                  <MapPin className="w-4 h-4 mr-1 text-orange-500" />{" "}
                  {tour.destination}
                </p>

                <div className="mb-6 flex-grow">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Inclusions:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tour.inclusions.map((inc, idx) => (
                      <span
                        key={idx}
                        className="bg-teal-50 text-teal-800 text-xs px-2 py-1 rounded border border-teal-100 flex items-center"
                      >
                        <CheckCircle className="w-3 h-3 mr-1 text-teal-600" />{" "}
                        {inc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">
                      Starts From
                    </p>
                    <div className="text-teal-900 font-extrabold text-2xl flex items-center">
                      <IndianRupee className="w-5 h-5" />{" "}
                      {tour.price.toLocaleString()}
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/${contact.whatsapp}?text=I am interested in the ${tour.title} package.`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-orange-600 text-grey px-5 py-2 rounded-lg font-bold shadow hover:bg-orange-700 transition-colors"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const GalleryPage = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Captured Moments" subtitle="Our Gallery" />
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {MOCK_GALLERY.map((img) => (
            <div
              key={img.id}
              className="relative group overflow-hidden rounded-xl cursor-pointer break-inside-avoid"
              onClick={() => setSelectedImg(img.url)}
            >
              <img
                src={img.url}
                alt={img.category}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-teal-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-grey font-bold text-xl flex items-center">
                  <ImageIcon className="mr-2" /> {img.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedImg && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImg(null)}
        >
          <button className="absolute top-6 right-6 text-grey hover:text-orange-500 transition-colors">
            <X className="w-10 h-10" />
          </button>
          <img
            src={selectedImg}
            alt="Gallery Preview"
            className="max-w-full max-h-[90vh] object-contain rounded"
          />
        </div>
      )}
    </div>
  );
};

const AboutPage = () => (
  <div className="pt-32 pb-24 bg-white min-h-screen animate-fade-in">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h4 className="text-orange-600 font-bold tracking-wider uppercase text-sm mb-2">
            About Us
          </h4>
          <h2 className="text-4xl font-extrabold text-teal-900 mb-6">
            Your Journey, Our Responsibility
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            Founded with a vision to provide authentic and hassle-free travel
            experiences, Shree Balaji Travels has grown into one of the most
            trusted tourism companies in India. We specialize in curating
            journeys that touch the soul, whether it's a divine pilgrimage, a
            relaxing family vacation, or an adventurous mountain trek.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8 text-lg">
            Our extensive network of premium hotels, reliable transport
            services, and expert local guides ensures that every moment of your
            trip is perfectly orchestrated.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
              <div className="text-4xl font-black text-orange-600 mb-2">
                10k+
              </div>
              <div className="text-teal-900 font-bold">Happy Travelers</div>
            </div>
            <div className="bg-teal-50 p-6 rounded-xl border border-teal-100">
              <div className="text-4xl font-black text-teal-600 mb-2">50+</div>
              <div className="text-teal-900 font-bold">Destinations</div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-orange-500 rounded-3xl transform translate-x-4 translate-y-4"></div>
          <img
            src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&q=80"
            alt="About Shree Balaji"
            className="relative z-10 rounded-3xl shadow-2xl w-full object-cover h-[600px]"
          />
        </div>
      </div>
    </div>
  </div>
);

const ContactPage = () => {
  const { contact } = useConfig();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    interest: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        mobile: "",
        interest: "",
        message: "",
      });
      setTimeout(() => setStatus(null), 5000);
    }, 1500);
  };

  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Get In Touch" subtitle="Contact Us" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
              <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <PhoneCall className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-teal-900 mb-2">Call Us</h3>
              <p className="text-gray-600">{contact.phone}</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
              <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-teal-900 mb-2">Email Us</h3>
              <p className="text-gray-600">{contact.email}</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
              <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-teal-900 mb-2">Visit Us</h3>
              <p className="text-gray-600">{contact.address}</p>
            </div>
          </div>
          <div className="lg:col-span-2 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-teal-900 mb-6">
              Send an Inquiry
            </h3>
            {status === "success" && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" /> Thank you! Your inquiry
                has been submitted successfully.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <input
                    required
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Interested In
                  </label>
                  <select
                    value={formData.interest}
                    onChange={(e) =>
                      setFormData({ ...formData, interest: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="">Select Tour Type</option>
                    <option value="Religious">Religious Tours</option>
                    <option value="Family">Family Holidays</option>
                    <option value="Weekend">Weekend Getaways</option>
                    <option value="Custom">Custom Package</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
                ></textarea>
              </div>
              <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 text-lg"
              >
                {status === "loading" ? "Sending..." : "Submit Inquiry"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [config, setConfig] = useState({
    phone: "+91 9761794067",
    email: "tyagis394@gmail.com",
    whatsapp: "6395599414",
    address: "Balavali tiraha, Goverdhan-pur Laksar road, Distt - Haridwar, Uttarakhand - 247663, India",
  });

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage navigate={navigate} />;
      case "tours":
        return <ComboToursPage />;
      case "gallery":
        return <GalleryPage />;
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <ConfigContext.Provider value={{ contact: config }}>
      <div className="font-sans text-gray-900 bg-white min-h-screen flex flex-col selection:bg-orange-500 selection:text-grey">
        <style
          dangerouslySetInnerHTML={{
            __html: `
                    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                    @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                    .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
                    .animate-slide-up { animation: slideUp 0.8s ease-out forwards; opacity: 0; }
                `,
          }}
        />
        <Navbar currentPage={currentPage} navigate={navigate} />
        <main className="flex-grow">{renderPage()}</main>
        <Footer navigate={navigate} />
        <a
          href={`https://wa.me/${config.whatsapp}?text=Hello sir, I am interested in your travel packages. Please give me a call.`}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 text-grey p-4 rounded-full shadow-2xl hover:bg-green-600 transition-transform hover:scale-110 z-50 flex items-center justify-center group"
        >
          <svg
            className="w-8 h-8"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
          <span className="absolute right-full mr-4 bg-gray-900 text-white px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Chat on WhatsApp
          </span>
        </a>
      </div>
    </ConfigContext.Provider>
  );
}

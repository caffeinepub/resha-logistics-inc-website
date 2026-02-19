import Array "mo:core/Array";
import Order "mo:core/Order";
import List "mo:core/List";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Inquiries "mo:core/List";
import OutCall "http-outcalls/outcall";
import MixinStorage "blob-storage/Mixin";

actor {
  include MixinStorage();

  type Inquiry = {
    name : Text;
    phone : Text;
    email : Text;
    comment : Text;
    timestamp : Int;
  };

  module Inquiry {
    public func compare(a : Inquiry, b : Inquiry) : Order.Order {
      switch (Text.compare(a.name, b.name)) {
        case (#equal) {
          switch (Text.compare(a.timestamp.toText(), b.timestamp.toText())) {
            case (#equal) { #equal };
            case (other) { other };
          };
        };
        case (other) { other };
      };
    };

    public func fromArray(array : [Inquiry]) : Inquiries.List<Inquiry> {
      let list = Inquiries.empty<Inquiry>();
      for (item in array.values()) {
        List.add(list, item);
      };
      list;
    };
  };

  type QuoteRequest = {
    name : Text;
    phone : Text;
    email : Text;
    pickupLocation : Text;
    deliveryLocation : Text;
    loadDetails : Text;
    consentGiven : Bool;
    timestamp : Int;
  };

  module QuoteRequest {
    public func compare(a : QuoteRequest, b : QuoteRequest) : Order.Order {
      switch (Text.compare(a.name, b.name)) {
        case (#equal) {
          switch (Text.compare(a.timestamp.toText(), b.timestamp.toText())) {
            case (#equal) { #equal };
            case (other) { other };
          };
        };
        case (other) { other };
      };
    };

    public func fromArray(array : [QuoteRequest]) : Inquiries.List<QuoteRequest> {
      let list = Inquiries.empty<QuoteRequest>();
      for (item in array.values()) {
        List.add(list, item);
      };
      list;
    };
  };

  type RateTable = {
    distanceRange : Text;
    cargoType : Text;
    rate : Text;
  };

  module RateTable {
    public func compare(a : RateTable, b : RateTable) : Order.Order {
      switch (Text.compare(a.distanceRange, b.distanceRange)) {
        case (#equal) {
          switch (Text.compare(a.cargoType, b.cargoType)) {
            case (#equal) { #equal };
            case (other) { other };
          };
        };
        case (other) { other };
      };
    };

    public func fromArray(array : [RateTable]) : Inquiries.List<RateTable> {
      let list = Inquiries.empty<RateTable>();
      for (item in array.values()) {
        List.add(list, item);
      };
      list;
    };
  };

  public type ContactInfo = {
    phone : Text;
    email : Text;
    address : Text;
    working_hours : Text;
  };

  public type TollFreeNumber = {
    country : Text;
    phone : Text;
  };

  public type AboutSection = {
    id : Nat;
    topic : Text;
    description : Text;
    icon : ?Text;
  };

  public type Service = {
    id : Nat;
    name : Text;
    description : Text;
    icon : ?Text;
  };

  public type CargoType = {
    id : Nat;
    name : Text;
    description : Text;
    icon : ?Text;
  };

  public type EquipmentType = {
    id : Nat;
    name : Text;
    description : Text;
    icon : ?Text;
  };

  public type Step = {
    id : Nat;
    title : Text;
    description : Text;
    icon : ?Text;
    stage : Nat;
  };

  public type PricingAdjuster = {
    id : Nat;
    name : Text;
    description : Text;
    percentage : Nat;
  };

  public type OperatingArea = {
    id : Nat;
    name : Text;
    description : Text;
    color : Text;
    coordinates : [(Float, Float)];
    abbreviation : Text;
    colorHex : Text;
  };

  public type Location = {
    id : Nat;
    name : Text;
    coordinates : (Float, Float);
    colorHex : Text;
    abbreviation : Text;
  };

  public type City = {
    name : Text;
    coordinates : (Float, Float);
  };

  public type AreaDetails = {
    abbreviation : Text;
    labelText : Text;
    color : Text;
    d_rate_low : Text;
    d_rate_base : Text;
    d_rate_high : Text;
    self_rate_low : Text;
    self_rate_base : Text;
    self_rate_high : Text;
    d_mileage_calc : Text;
    self_mileage_calc : Text;
    min_miles : Nat;
    min_freight_rate : Nat;
  };

  let initialInquiries : [Inquiry] = [];
  let inquiriesList = Inquiry.fromArray(initialInquiries);

  let initialQuoteRequests : [QuoteRequest] = [];
  let quoteRequestsList = QuoteRequest.fromArray(initialQuoteRequests);

  let initialRateTables : [RateTable] = [
    { distanceRange = "0-250"; cargoType = "Vans"; rate = "2.06" },
    { distanceRange = "0-250"; cargoType = "Temp Control"; rate = "2.48" },
    { distanceRange = "0-250"; cargoType = "Flatbed"; rate = "2.48" },
    { distanceRange = "251-400"; cargoType = "Vans"; rate = "1.68" },
    { distanceRange = "251-400"; cargoType = "Temp Control"; rate = "1.98" },
    { distanceRange = "251-400"; cargoType = "Flatbed"; rate = "1.99" },
    { distanceRange = "401-550"; cargoType = "Vans"; rate = "1.44" },
    { distanceRange = "401-550"; cargoType = "Temp Control"; rate = "1.69" },
    { distanceRange = "401-550"; cargoType = "Flatbed"; rate = "2.03" },
    { distanceRange = "551-1100"; cargoType = "Vans"; rate = "1.27" },
    { distanceRange = "551-1100"; cargoType = "Temp Control"; rate = "1.47" },
    { distanceRange = "551-1100"; cargoType = "Flatbed"; rate = "1.33" },
    { distanceRange = "1101+ miles"; cargoType = "Vans"; rate = "1.09" },
    { distanceRange = "1101+ miles"; cargoType = "Temp Control"; rate = "1.24" },
    { distanceRange = "1101+ miles"; cargoType = "Flatbed"; rate = "1.09" },
  ];
  let rateTables = RateTable.fromArray(initialRateTables);

  let contactInfo : [ContactInfo] = [
    {
      phone = "+1-855-RESHA-01 (855-737-4201)";
      email = "support@reshalogistics.com";
      address = "512 Oakridge Dr., Corpus Christi, TX 78418, United States";
      working_hours = "Monday to Friday 09:00 am to 05:00 pm";
    }
  ];

  let tollFreeNumbers : [TollFreeNumber] = [
    {
      country = "Canada";
      phone = "+1-647-848-2221";
    },
    {
      country = "Mexico";
      phone = "+52-442-964-0112";
    },
    {
      country = "Central America & Caribbean";
      phone = "1-855-412-4252 (English + Spanish)";
    },
  ];

  let aboutSections : [AboutSection] = [
    {
      id = 1;
      topic = "Comprehensive Service. Unmatched Capability.";
      description = "Your trusted partner, delivering reliable and personalized full truckload freight solutions throughout North America.";
      icon = null;
    },
    {
      id = 2;
      topic = "Customer Focused";
      description = "We put our clients first, offering tailored solutions and transparent communication.";
      icon = null;
    },
    {
      id = 3;
      topic = "Experienced Team";
      description = "Our logistics professionals bring industry expertise and a commitment to excellence.";
      icon = null;
    },
    {
      id = 4;
      topic = "Efficiency and Reliability";
      description = "We utilize technology and proven processes to ensure timely and dependable deliveries.";
      icon = null;
    },
  ];

  let services : [Service] = [
    {
      id = 1;
      name = "Full Truckload (FTL)";
      description = "Complete truckload shipping solutions for large or high-volume shipments.";
      icon = null;
    },
    {
      id = 2;
      name = "Expedited Shipping";
      description = "Fast and time-sensitive delivery services for urgent shipments.";
      icon = null;
    },
    {
      id = 3;
      name = "Cross-Border Logistics";
      description = "Seamless transportation between the US, Canada, Mexico, and Central America.";
      icon = null;
    },
    {
      id = 4;
      name = "Dedicated Fleet";
      description = "Exclusive use of vehicles for consistent and specialized transportation needs.";
      icon = null;
    },
    {
      id = 5;
      name = "Temperature-Controlled";
      description = "Solutions for perishable goods requiring refrigerated or climate-controlled environments.";
      icon = null;
    },
    {
      id = 6;
      name = "Hazardous Materials";
      description = "Safe and compliant transportation of hazardous materials.";
      icon = null;
    },
    {
      id = 7;
      name = "Flatbed";
      description = "Flatbed services for large, oversized, or irregularly shaped cargo.";
      icon = null;
    },
    {
      id = 8;
      name = "Specialized Equipment";
      description = "Solutions for oversized, overweight, or unique transportation needs.";
      icon = null;
    },
  ];

  let cargoTypes : [CargoType] = [
    {
      id = 1;
      name = "General Goods";
      description = "Everyday products and consumer goods.";
      icon = null;
    },
    {
      id = 2;
      name = "Temperature-Sensitive";
      description = "Perishable goods requiring climate control.";
      icon = null;
    },
    {
      id = 3;
      name = "Hazardous Materials";
      description = "Chemicals, flammable substances, and dangerous goods.";
      icon = null;
    },
    {
      id = 4;
      name = "Machinery and Equipment";
      description = "Industrial, agricultural, and construction machinery.";
      icon = null;
    },
    {
      id = 5;
      name = "Automotive Parts";
      description = "Components, vehicles, and parts for the automotive industry.";
      icon = null;
    },
    {
      id = 6;
      name = "Retail and Wholesale";
      description = "Distribution of goods to retail stores and supermarkets.";
      icon = null;
    },
    {
      id = 7;
      name = "Medical and Healthcare";
      description = "Medical equipment, pharmaceuticals, and healthcare supplies.";
      icon = null;
    },
    {
      id = 8;
      name = "Project Cargo";
      description = "Oversized or specialized shipments for unique projects.";
      icon = null;
    },
  ];

  let equipmentTypes : [EquipmentType] = [
    {
      id = 1;
      name = "Dry Van";
      description = "Enclosed trailers for general cargo.";
      icon = null;
    },
    {
      id = 2;
      name = "Refrigerated (Reefer)";
      description = "Trailers with temperature control for perishable goods.";
      icon = null;
    },
    {
      id = 3;
      name = "Flatbed";
      description = "Open trailers for oversized or irregularly shaped cargo.";
      icon = null;
    },
    {
      id = 4;
      name = "Specialized Trailers";
      description = "Trailers designed for specific transportation needs.";
      icon = null;
    },
  ];

  let steps : [Step] = [
    {
      id = 1;
      title = "Request a Quote";
      description = "Submit your shipment details for a tailored quote.";
      icon = null;
      stage = 1;
    },
    {
      id = 2;
      title = "Receive Estimate";
      description = "Get a transparent cost estimate based on your requirements.";
      icon = null;
      stage = 1;
    },
    {
      id = 3;
      title = "Confirm Booking";
      description = "Finalize your shipment and choose desired services.";
      icon = null;
      stage = 1;
    },
    {
      id = 4;
      title = "Load Pickup";
      description = "Our team coordinates pickup at your specified location.";
      icon = null;
      stage = 2;
    },
    {
      id = 5;
      title = "Transit and Tracking";
      description = "Real-time shipment tracking and regular updates.";
      icon = null;
      stage = 2;
    },
    {
      id = 6;
      title = "Delivery";
      description = "Your shipment is delivered on time to the destination.";
      icon = null;
      stage = 2;
    },
    {
      id = 7;
      title = "Ongoing Support";
      description = "Customer service and support throughout the process.";
      icon = null;
      stage = 3;
    },
    {
      id = 8;
      title = "Feedback Submission";
      description = "Share your experience to help continuous improvement.";
      icon = null;
      stage = 3;
    },
  ];

  let pricingAdjusters : [PricingAdjuster] = [
    {
      id = 1;
      name = "Distance Tier";
      description = "Pricing based on distance range.";
      percentage = 0;
    },
    {
      id = 2;
      name = "Cargo Type";
      description = "Adjustments based on cargo type (e.g., hazardous materials, temperature-sensitive items).";
      percentage = 0;
    },
    {
      id = 3;
      name = "Service Level";
      description = "Pricing for expedited or specialized services.";
      percentage = 0;
    },
    {
      id = 4;
      name = "Market Fluctuations";
      description = "Adjustments based on current market trends.";
      percentage = 0;
    },
    {
      id = 5;
      name = "Seasonal Demand";
      description = "Changes in pricing based on seasonal fluctuations.";
      percentage = 0;
    },
    {
      id = 6;
      name = "Lane Specifics";
      description = "Adjustments for specific lanes or routes.";
      percentage = 0;
    },
    {
      id = 7;
      name = "Value-Added Services";
      description = "Pricing for additional services like handling fees or equipment charges.";
      percentage = 0;
    },
  ];

  let operatingAreas : [OperatingArea] = [
    {
      id = 1;
      name = "Pacific Northwest";
      description = "Seattle, WA; Portland, OR; Spokane, WA";
      color = "#A15CE2";
      coordinates = [(47.6062, -122.3321), (45.5152, -122.6784), (47.6588, -117.4260)];
      abbreviation = "PNW";
      colorHex = "#A15CE2";
    },
    {
      id = 2;
      name = "California";
      description = "Los Angeles, San Francisco, Sacramento";
      color = "#665BE0";
      coordinates = [(34.0522, -118.2437), (37.7749, -122.4194), (38.5816, -121.4944)];
      abbreviation = "CAF";
      colorHex = "#665BE0";
    },
    {
      id = 3;
      name = "Midwest";
      description = "Chicago, IL; Detroit, MI; Minneapolis, MN";
      color = "#467CDF";
      coordinates = [(41.8781, -87.6298), (42.3314, -83.0458), (44.9778, -93.2650)];
      abbreviation = "MDW";
      colorHex = "#467CDF";
    },
    {
      id = 4;
      name = "Northeast";
      description = "New York, NY; Boston, MA; Philadelphia, PA";
      color = "#32AAD6";
      coordinates = [(40.7128, -74.0060), (42.3601, -71.0589), (39.9526, -75.1652)];
      abbreviation = "NET";
      colorHex = "#32AAD6";
    },
    {
      id = 5;
      name = "Southeast";
      description = "Atlanta, GA; Miami, FL; Charlotte, NC";
      color = "#3AB8D3";
      coordinates = [(33.7490, -84.3880), (25.7617, -80.1918), (35.2271, -80.8431)];
      abbreviation = "SET";
      colorHex = "#3AB8D3";
    },
    {
      id = 6;
      name = "South Central";
      description = "Dallas, TX; Houston, TX; San Antonio, TX";
      color = "#1DC5C8";
      coordinates = [(32.7767, -96.7970), (29.7604, -95.3698), (29.4241, -98.4936)];
      abbreviation = "SCT";
      colorHex = "#1DC5C8";
    },
    {
      id = 7;
      name = "Mountain States";
      description = "Denver, CO; Salt Lake City, UT; Phoenix, AZ";
      color = "#69CCB3";
      coordinates = [(39.7392, -104.9903), (40.7608, -111.8910), (33.4484, -112.0740)];
      abbreviation = "MNT";
      colorHex = "#69CCB3";
    },
    {
      id = 8;
      name = "Great Plains";
      description = "Kansas City, MO; Omaha, NE; Oklahoma City, OK";
      color = "#B4D56F";
      coordinates = [(39.0997, -94.5786), (41.2565, -95.9345), (35.4676, -97.5164)];
      abbreviation = "GPL";
      colorHex = "#B4D56F";
    },
    {
      id = 9;
      name = "Southwest";
      description = "Phoenix, AZ; Las Vegas, NV; Albuquerque, NM";
      color = "#FAA934";
      coordinates = [(33.4484, -112.0740), (36.1699, -115.1398), (35.0844, -106.6504)];
      abbreviation = "SW";
      colorHex = "#FAA934";
    },
    {
      id = 10;
      name = "North Atlantic";
      description = "Washington, D.C.; Baltimore, MD; Richmond, VA";
      color = "#EC633C";
      coordinates = [(38.8951, -77.0369), (39.2904, -76.6122), (37.5407, -77.4360)];
      abbreviation = "NATL";
      colorHex = "#EC633C";
    },
    {
      id = 11;
      name = "Florida";
      description = "Miami, Orlando, Tampa";
      color = "#F86066";
      coordinates = [(25.7617, -80.1918), (28.5383, -81.3792), (27.9506, -82.4572)];
      abbreviation = "FLA";
      colorHex = "#F86066";
    },
    {
      id = 12;
      name = "Gulf Coast";
      description = "Houston, TX; New Orleans, LA; Tampa, FL";
      color = "#fd069b";
      coordinates = [(29.7604, -95.3698), (29.9511, -90.0715), (27.9506, -82.4572)];
      abbreviation = "GULF";
      colorHex = "#fd069b";
    },
    {
      id = 13;
      name = "Canada";
      description = "Toronto, Montreal, Vancouver";
      color = "#FF0000";
      coordinates = [(43.6510, -79.347015), (45.5402, -73.4897), (49.2827, -123.1207)];
      abbreviation = "CDN";
      colorHex = "#FF0000";
    },
    {
      id = 14;
      name = "Mexico";
      description = "Mexico City, Monterrey, Guadalajara";
      color = "#006600";
      coordinates = [(19.4326, -99.1332), (25.6866, -100.3161), (20.6597, -103.3496)];
      abbreviation = "MEX";
      colorHex = "#006600";
    },
  ];

  let areaDetails : [AreaDetails] = [
    {
      abbreviation = "PNW";
      labelText = "Pacific Northwest";
      color = "#A15CE2";
      d_rate_low = "$2.16";
      d_rate_base = "$2.41";
      d_rate_high = "$2.65";
      self_rate_low = "$2.06";
      self_rate_base = "$2.31";
      self_rate_high = "$2.55";
      d_mileage_calc = "100";
      self_mileage_calc = "300";
      min_miles = 200;
      min_freight_rate = 400;
    },
    {
      abbreviation = "CAF";
      labelText = "California";
      color = "#665BE0";
      d_rate_low = "$1.96";
      d_rate_base = "$2.21";
      d_rate_high = "$2.45";
      self_rate_low = "$1.86";
      self_rate_base = "$2.11";
      self_rate_high = "$2.35";
      d_mileage_calc = "150";
      self_mileage_calc = "350";
      min_miles = 250;
      min_freight_rate = 350;
    },
    {
      abbreviation = "MDW";
      labelText = "Midwest";
      color = "#467CDF";
      d_rate_low = "$1.76";
      d_rate_base = "$2.01";
      d_rate_high = "$2.25";
      self_rate_low = "$1.66";
      self_rate_base = "$1.91";
      self_rate_high = "$2.15";
      d_mileage_calc = "200";
      self_mileage_calc = "400";
      min_miles = 300;
      min_freight_rate = 300;
    },
    {
      abbreviation = "NET";
      labelText = "Northeast";
      color = "#32AAD6";
      d_rate_low = "$2.26";
      d_rate_base = "$2.51";
      d_rate_high = "$2.75";
      self_rate_low = "$2.16";
      self_rate_base = "$2.41";
      self_rate_high = "$2.65";
      d_mileage_calc = "250";
      self_mileage_calc = "450";
      min_miles = 400;
      min_freight_rate = 650;
    },
    {
      abbreviation = "SET";
      labelText = "Southeast";
      color = "#3AB8D3";
      d_rate_low = "$1.86";
      d_rate_base = "$2.11";
      d_rate_high = "$2.35";
      self_rate_low = "$1.76";
      self_rate_base = "$2.01";
      self_rate_high = "$2.25";
      d_mileage_calc = "225";
      self_mileage_calc = "275";
      min_miles = 200;
      min_freight_rate = 350;
    },
    {
      abbreviation = "SCT";
      labelText = "South Central";
      color = "#1DC5C8";
      d_rate_low = "$2.06";
      d_rate_base = "$2.31";
      d_rate_high = "$2.55";
      self_rate_low = "$1.96";
      self_rate_base = "$2.21";
      self_rate_high = "$2.45";
      d_mileage_calc = "150";
      self_mileage_calc = "350";
      min_miles = 200;
      min_freight_rate = 400;
    },
    {
      abbreviation = "MNT";
      labelText = "Mountain States";
      color = "#69CCB3";
      d_rate_low = "$1.56";
      d_rate_base = "$1.81";
      d_rate_high = "$2.05";
      self_rate_low = "$1.46";
      self_rate_base = "$1.71";
      self_rate_high = "$1.95";
      d_mileage_calc = "200";
      self_mileage_calc = "500";
      min_miles = 300;
      min_freight_rate = 300;
    },
    {
      abbreviation = "GPL";
      labelText = "Great Plains";
      color = "#B4D56F";
      d_rate_low = "$1.76";
      d_rate_base = "$2.01";
      d_rate_high = "$2.25";
      self_rate_low = "$1.66";
      self_rate_base = "$1.91";
      self_rate_high = "$2.15";
      d_mileage_calc = "200";
      self_mileage_calc = "400";
      min_miles = 300;
      min_freight_rate = 300;
    },
    {
      abbreviation = "SW";
      labelText = "Southwest";
      color = "#FAA934";
      d_rate_low = "$1.96";
      d_rate_base = "$2.21";
      d_rate_high = "$2.45";
      self_rate_low = "$1.86";
      self_rate_base = "$2.11";
      self_rate_high = "$2.35";
      d_mileage_calc = "175";
      self_mileage_calc = "475";
      min_miles = 400;
      min_freight_rate = 650;
    },
    {
      abbreviation = "NATL";
      labelText = "North Atlantic";
      color = "#EC633C";
      d_rate_low = "$2.06";
      d_rate_base = "$2.31";
      d_rate_high = "$2.55";
      self_rate_low = "$1.96";
      self_rate_base = "$2.21";
      self_rate_high = "$2.45";
      d_mileage_calc = "150";
      self_mileage_calc = "350";
      min_miles = 200;
      min_freight_rate = 400;
    },
    {
      abbreviation = "FLA";
      labelText = "Florida";
      color = "#F86066";
      d_rate_low = "$1.76";
      d_rate_base = "$2.01";
      d_rate_high = "$2.25";
      self_rate_low = "$1.66";
      self_rate_base = "$1.91";
      self_rate_high = "$2.15";
      d_mileage_calc = "200";
      self_mileage_calc = "400";
      min_miles = 300;
      min_freight_rate = 300;
    },
    {
      abbreviation = "GULF";
      labelText = "Gulf Coast";
      color = "#fd069b";
      d_rate_low = "$1.56";
      d_rate_base = "$1.81";
      d_rate_high = "$2.05";
      self_rate_low = "$1.46";
      self_rate_base = "$1.71";
      self_rate_high = "$1.95";
      d_mileage_calc = "200";
      self_mileage_calc = "500";
      min_miles = 300;
      min_freight_rate = 300;
    },
    {
      abbreviation = "CDN";
      labelText = "Canada";
      color = "#FF0000";
      d_rate_low = "$1.76";
      d_rate_base = "$2.01";
      d_rate_high = "$2.25";
      self_rate_low = "$1.66";
      self_rate_base = "$1.91";
      self_rate_high = "$2.15";
      d_mileage_calc = "200";
      self_mileage_calc = "400";
      min_miles = 300;
      min_freight_rate = 300;
    },
    {
      abbreviation = "MEX";
      labelText = "Mexico";
      color = "#006600";
      d_rate_low = "$1.76";
      d_rate_base = "$2.01";
      d_rate_high = "$2.25";
      self_rate_low = "$1.66";
      self_rate_base = "$1.91";
      self_rate_high = "$2.15";
      d_mileage_calc = "200";
      self_mileage_calc = "400";
      min_miles = 300;
      min_freight_rate = 300;
    },
  ];
};

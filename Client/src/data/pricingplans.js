const pricingPlans = [
 {
  id: 1,
  title: "Regular",
  price: 99,
  duration: "month",
  planKey: "regular",
  features: [
    "Access to basic home workout plans",
    "Limited gym workout routines",
    "Weekly diet suggestions (static plans)",
    "Workout history tracking",
    "Community forum access",
    "Email support"
  ]
},
{
  id: 2,
  title: "Gold Member",
  price: 499,
  duration: "month",
  planKey: "gold",
  features: [
    "All Standard plan features",
    "AI-based personalized workout plan",
    "1-on-1 online trainer consultation",
    "Custom macro & micronutrient tracking",
    "Live workout sessions access",
    "Exclusive premium video library",
    "Injury recovery & rehab plans",
    "Direct WhatsApp support",
    "Early access to new features",
    "Premium badge on profile"
  ]
},
  {
  id: 3,
  title: "Standard Member",
  price: 199,
  duration: "month",
  planKey: "standard",
  features: [
    "All Regular plan features",
    "Advanced gym & home workout plans",
    "Custom calorie-based meal plans",
    "Progress analytics dashboard",
    "BMI & body fat tracking",
    "Monthly fitness challenges",
    "Downloadable workout PDFs",
    "Priority email support"
  ]
},
  
];

export default pricingPlans;
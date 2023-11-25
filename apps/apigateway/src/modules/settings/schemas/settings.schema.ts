import mongoose from 'mongoose';

const SettingSchema = new mongoose.Schema(
  {
    landingPageConfig: {
      showBlog: { type: Boolean, default: true },
      showAffiliate: { type: Boolean, default: true },
      showTestimonial: { type: Boolean, default: true },
    },

    appConfig: {
      layoutOptions: {
        typography: { type: String, default: 'poppins' },
        version: { type: String, default: 'light' },
        layout: { type: String, default: 'vertical' },
        headerBg: { type: String, default: 'color_4' },
        // primary: {type:String,default:"color_4"},
        // navheaderBg: {type:String,default:"color_4"},
        // sidebarBg: {type:String,default:"color_4"},
        // sidebarStyle: {type:String,default:"full"},
        // sidebarPosition: {type:String,default:"fixed"},
        // headerPosition: {type:String,default:"fixed"},
        // containerLayout: {type:String,default:"full"},
        // direction: {type:String,default:"ltr"}
      },
    },
    companyDetails: {
      siteName: { type: String },
      description: { type: String },
      email: { type: [String] },
      contact: { type: [String] },
      address: { type: String },
      zip: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      activeHours: { type: String },
      socialMedia: {
        facebookHandle: { type: String },
        twitterHandle: { type: String },
        instagram: { type: String },
        whatsapp: { type: String },
      },
    },
    siteImages: {
      logo: { type: String },
      logoIcon: { type: String },
      logoDark: { type: String },
      favicon: { type: String },
      backgroundImage: { type: String },
      aboutUsBg: { type: String },
      pagesBg: { type: String },
      aboutVideo: { type: String },
    },
    pages: {
      aboutMe: { type: String },
      privacyPolicy: { type: String },
      termsCondition: { type: String },
    },
  },
  { timestamps: true },
);
export default SettingSchema;

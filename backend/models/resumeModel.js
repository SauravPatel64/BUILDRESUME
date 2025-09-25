import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    thumbnailLink: {
      type: String,
    },

    template: {
      theme: String,
      colorPalette: [String],
    },

    profileInfo: {
      profilePreviewUrl: String,
      fullName: String,
      designation: String,
      summary: String,
    },

    contactInfo: {
      email: String,
      phone: String,
      location: String,
      linkedin: String,
      github: String,
      website: String,
    },

    workExperience: [
      {
        company: String,
        role: String,
        startDate: String,
        endDate: String,
        description: String,
      },
    ],

    education: [
      {
        degree: String,
        institution: String,
        startDate: String,
        endDate: String,
      },
    ],

    skills: [
      {
        name: String,
        progress: Number,
      },
    ],

    projects: [
      {
        title: String,
        description: String,
        github: String,
        liveDemo: String,
      },
    ],

    certifications: [
      {
        title: String,
        issuer: String,
        year: String,
      },
    ],

    languages: [
      {
        name: String,
        progress: Number,
      },
    ],

    interests: [String],
  },
  {
    timestamps: true, // gives you createdAt & updatedAt automatically
  }
);

export default mongoose.model("Resume", ResumeSchema);

// const AcroSchema = new mongoose.Schema({
//   personal_information: {
//     name: "string",
//     image: "string", // URL or base64 encoded image
//     address: "string",
//     phone: "string",
//     email: "string",
//     linkedin: "string",
//     date_of_birth: "date",
//     gender: "string",
//     nationality: "string",
//     marital_status: "string",
//     languages_known: ["string"],
//     mother_tongue: "string",
//     father_name: "string",
//     permanent_address: "string",
//   },
//   career_objective: "string",
//   academic_record: {
//     professional_qualification: {
//       degree: "string",
//       institute: "string",
//       university: "string",
//       specialization: "string",
//       duration: "string",
//       average: "string",
//     },
//     educational_qualifications: [
//       {
//         level: "string",
//         school: "string",
//         board: "string",
//         year: "number",
//         percentage: "string",
//       },
//     ],
//   },
//   technical_skills: ["string"],
//   training: [
//     {
//       organization: "string",
//       description: "string",
//       role: "string",
//       duration: "string",
//     },
//   ],
//   internship: [
//     {
//       organization: "string",
//       description: "string",
//       role: "string",
//       duration: "string",
//     },
//   ],
//   projects: [
//     {
//       type: "string",
//       title: "string",
//       description: "string",
//       role: "string",
//       duration: "string",
//     },
//   ],
//   co_curricular_activities: ["string"],
//   certifications: ["string"],
//   strengths: ["string"],
//   areas_of_improvement: ["string"],
//   hobbies: ["string"],
//   areas_of_interest: ["string"],
//   references: [
//     {
//       name: "string",
//       designation: "string",
//       email: "string",
//     },
//   ],
//   declaration: "string",
// });

// export default mongoose.model("Resume1",AcroSchema)

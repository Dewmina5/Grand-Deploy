const mongoose = require("mongoose");

const skillLevels = ["Average", "Good", "Excellent"];

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});

const refereeSchema = new mongoose.Schema({
  name: String,
  address: String,
  telephone: String,
  email: String,
  fax: String,
  position: String,
  report: String,
});

const feesSchema = new mongoose.Schema({
  y1: String,
  y2: String,
  y3: String,
  total: String,
});

const marksRubric = new mongoose.Schema({});

const interviewMarkingSchema = new mongoose.Schema({
  interviewerName: String,
  interviewDate: Date,
  interviewScore: [marksRubric],
});

const publicationSchema = new mongoose.Schema({
  title: String,
  publisher: String,
  place: String,
  date: String,
  publicationDownLink: String,
});

/*const FileSchema = new Schema({
  publication: String,
  lastModified: String,
  lastModifiedDate: String,
  name: String,
  size: Number,
  type: String,
  webkitRelativePath: String
});*/

const educationSchema = new mongoose.Schema({
  fromMonthYear: { type: String },
  toMonthYear: { type: String },
  university: { type: String },
  degreesObtained: { type: String },
  fieldsOfStudy: { type: String },
});

const employmentSchema = new mongoose.Schema({
  fromMonthYear: { type: String },
  toMonthYear: { type: String },
  exactPost: { type: String },
  faculty: { type: String },
  department: { type: String },
  universityName: { type: String },
  isCurrent:{type:Boolean}
});

const otherFinSchema = new mongoose.Schema({
  orgName: String,
  amountYear: String,
  duration: String,
});

const otherSupDocs = new mongoose.Schema({
  selfLetter: String,
  workPlan: String,
  personalHealt: String,
  ielts: String,
  studyLetter: String,
});

const grantHolderSchema = new mongoose.Schema(
  {
    firstName: String,
    familyName: String,
    gender: String,
    dateOfBirth: Date,
    age: {
      years: Number,
      months: Number,
      days: Number,
    },
    nic: { type: String, required: true },
    upfNo: String,
    permanentAddress: addressSchema,
    photographUrl: String,
    email: String,
    telephoneNo: String,
    fax: String,
    degreeCetogary: {
      type: String,
      default: "local"

    },

    //   University Education
    educationTableData: [educationSchema],

    //language Capability
    SinhalaSkill: {
      speaking: {
        type: String,
      },
      reading: {
        type: String,
      },
      writing: {
        type: String,
      },
    },
    EnglishSkill: {
      speaking: {
        type: String,
      },
      reading: {
        type: String,
      },
      writing: {
        type: String,
      },
    },
    TamilSkill: {
      speaking: {
        type: String,
      },
      reading: {
        type: String,
      },
      writing: {
        type: String,
      },
    },

    employmentTableData: [employmentSchema],

    //Uni DepartmentDetails
    DepartmentHeadEmail: String,
    FacaltyHeadEmail: String,
    UnivercityHeadEmail: String,

    references: [refereeSchema],

    additionalSkillsAndFacts: String,

    publications: [publicationSchema],
    publicationPdfs : [{
      type: String,
    }],

    certificatesPdfs : [{
      type: String,
    }],
    cvPdfLink: String,
    //Details of the Study
    degreeSought: String,
    titleOfResearch: String,
    researchField: String,
    registeredForDegree: String,
    validPlacementLetter: String,
    placmentPDFDownURL: String,
    universityInstitution: String,
    facultyDepartment: String,
    facultyDepartmentRegistrationFromDate: Date,
    facultyDepartmentRegistrationToDate: Date,

    supervisorName: String,
    supervisorEmail: String,
    supervisorContactNo: String,
    supervisorFax: String,
    researchProposalSummary: String,
    detailedWorkPlanPDFURL: String,
    researchProposalPdfURL: String,
    teaching: Boolean,
    teachingHours: String,
    AdminPosition: Boolean,
    AdminPositionNames: String,
    otherReaserchW: Boolean,

    estimatedCostOfDegree: String,
    country: String,
    university: String,

    //Financial Information
    institutionalCost: feesSchema,
    registrationFees: feesSchema,
    tutionFees: feesSchema,
    otherFees: feesSchema,
    researchExpenses: feesSchema,

    selfDeclarationLetterUrl: String,
    personalHealthReportUrl: String,
    studyLeaveLetterUrl: String,
    ieltsToeflPteCertifiedCopyUrl: String,
    proofOfPaymentUrl: String,
    separateSelfDeclarationOtherFundingUrl: String,

    otherFinancialSup: otherFinSchema,
    otherSupDocs: otherSupDocs,

    receivedOn: String,

    VCApprooved: {
      type: String,
      default: "pending",
    },

    FHApprooved: {
      type: String,
      default: "pending",
    },
    DHApprooved: {
      type: String,
      default: "pending",
    },

    //interview Marks Process

    marks: [interviewMarkingSchema],
  },
  { timestamps: true }
);

const GrantHolder = mongoose.model("GrantHolder", grantHolderSchema);

module.exports = GrantHolder;

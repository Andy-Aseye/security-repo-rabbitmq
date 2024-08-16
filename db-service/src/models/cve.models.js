import mongoose from "mongoose";
const { Schema } = mongoose;

const CveSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  sourceIdentifier: {
    type: String,
    required: true,
  },
  published: {
    type: Date,
    required: true,
  },
  lastModified: {
    type: Date,
    required: true,
  },
  vulnStatus: {
    type: String,
    required: true,
  },
  cveTags: {
    type: [String],
  },
  cisaExploitAdd: {
    type: Date,
  },
  cisaActionDue: {
    type: Date,
  },
  cisaRequiredAction: {
    type: String,
  },
  cisaVulnerabilityName: {
    type: String,
  },
  descriptions: [
    {
      lang: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
    },
  ],
  metrics: {
    cvssMetricV2: [
      {
        source: {
          type: String,
          required: true,
        },
        type: {
          type: String,
        },
        cvssData: {
          version: {
            type: String,
            required: true,
          },
          vectorString: {
            type: String,
          },
          accessVector: {
            type: String,
          },
          accessComplexity: {
            type: String,
          },
          authentication: {
            type: String,
          },
          confidentialityImpact: {
            type: String,
          },
          integrityImpact: {
            type: String,
          },
          availabilityImpact: {
            type: String,
          },
          baseScore: {
            type: Number,
            required: true,
          },
        },
        baseSeverity: {
          type: String,
        },
        exploitabilityScore: {
          type: Number,
        },
        impactScore: {
          type: Number,
        },
        acInsufInfo: {
          type: Boolean,
        },
        obtainAllPrivilege: {
          type: Boolean,
        },
        obtainUserPrivilege: {
          type: Boolean,
        },
        obtainOtherPrivilege: {
          type: Boolean,
        },
        userInteractionRequired: {
          type: Boolean,
        },
      },
    ],
  },
  weaknesses: [
    {
      source: {
        type: String,
        required: true,
      },
      type: {
        type: String,
      },
      description: [
        {
          lang: {
            type: String,
          },
          value: {
            type: String,
          },
        },
      ],
    },
  ],
  configurations: [
    {
      nodes: [
        {
          operator: {
            type: String,
          },
          negate: {
            type: Boolean,
          },
          cpeMatch: [
            {
              vulnerable: {
                type: Boolean,
                required: true,
              },
              criteria: {
                type: String,
                required: true,
              },
              matchCriteriaId: {
                type: String,
              },
            },
          ],
        },
      ],
    },
  ],
  references: [
    {
      url: {
        type: String,
        required: true,
      },
      source: {
        type: String,
      },
      tags: {
        type: [String],
      },
    },
  ],
});

export default mongoose.model("Cve", CveSchema);

import mongoose, { Document, Schema } from 'mongoose';

// Ideation interface
export interface IIdeation {
  ideas: Array<{
    title: string;
    description: string;
    scores: {
      feasibility: number;
      impact: number;
      innovation: number;
    };
    notes: string[];
    mindmap?: any;
    createdAt: Date;
  }>;
}

// Problem Definition interface
export interface IProblemDefinition {
  problemStatement: string;
  personas: Array<{
    name: string;
    age?: number;
    occupation?: string;
    goals: string[];
    frustrations: string[];
    avatar?: string;
  }>;
  painPoints: string[];
  objectives: Array<{
    description: string;
    metric: string;
    target: string;
    deadline?: Date;
  }>;
  attachments: string[];
}

// Solution Definition interface
export interface ISolutionDefinition {
  solutionOverview: string;
  keyFeatures: Array<{
    name: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    status: 'planned' | 'in-progress' | 'completed';
  }>;
  alternatives: Array<{
    name: string;
    pros: string[];
    cons: string[];
    selected: boolean;
  }>;
  mvp: {
    features: string[];
    timeline: string;
    resources: string[];
  };
}

// Audience/Market interface
export interface IAudienceMarket {
  marketSize: {
    tam: string; // Total Addressable Market
    sam: string; // Serviceable Addressable Market
    som: string; // Serviceable Obtainable Market
  };
  segments: Array<{
    name: string;
    size: string;
    characteristics: string[];
    priority: number;
  }>;
  competitors: Array<{
    name: string;
    strengths: string[];
    weaknesses: string[];
    marketShare?: string;
    url?: string;
  }>;
  researchData: any[];
  charts: any[];
}

// Technical Specification interface
export interface ITechnicalSpec {
  userStories: Array<{
    title: string;
    asA: string;
    iWant: string;
    soThat: string;
    acceptanceCriteria: string[];
    priority: 'high' | 'medium' | 'low';
  }>;
  functionalRequirements: string[];
  nonFunctionalRequirements: string[];
  diagrams: Array<{
    type: 'uml' | 'flowchart' | 'sequence' | 'other';
    name: string;
    data: any;
    imageUrl?: string;
  }>;
}

// Database Design interface
export interface IDatabaseDesign {
  entities: Array<{
    name: string;
    attributes: Array<{
      name: string;
      type: string;
      required: boolean;
      unique: boolean;
    }>;
  }>;
  relationships: Array<{
    from: string;
    to: string;
    type: 'one-to-one' | 'one-to-many' | 'many-to-many';
    description: string;
  }>;
  erDiagram?: any;
  sqlExport?: string;
}

// Wireframe interface
export interface IWireframe {
  screens: Array<{
    name: string;
    type: 'low-fidelity' | 'high-fidelity';
    elements: any[];
    imageUrl?: string;
    notes: string;
  }>;
  prototype?: {
    url: string;
    interactive: boolean;
  };
}

// Development interface
export interface IDevelopment {
  tasks: Array<{
    title: string;
    description: string;
    assignee?: string;
    status: 'todo' | 'in-progress' | 'review' | 'done';
    priority: 'high' | 'medium' | 'low';
    dueDate?: Date;
    tags: string[];
  }>;
  timeline: {
    startDate: Date;
    endDate: Date;
    milestones: Array<{
      name: string;
      date: Date;
      completed: boolean;
    }>;
  };
  repositories: Array<{
    name: string;
    url: string;
    branch: string;
  }>;
  codeSnippets: Array<{
    title: string;
    language: string;
    code: string;
    notes: string;
  }>;
  bugs: Array<{
    title: string;
    description: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    status: 'open' | 'in-progress' | 'resolved';
    reportedBy: string;
    reportedAt: Date;
  }>;
}

// Go to Market interface
export interface IGoToMarket {
  launchDate?: Date;
  marketingStrategy: {
    channels: string[];
    budget?: string;
    campaigns: Array<{
      name: string;
      description: string;
      startDate: Date;
      endDate: Date;
      budget?: string;
    }>;
  };
  betaTesting: {
    enabled: boolean;
    testers: number;
    feedback: Array<{
      user: string;
      comment: string;
      rating: number;
      date: Date;
    }>;
  };
  successMetrics: Array<{
    name: string;
    target: string;
    current?: string;
  }>;
  launchChecklist: Array<{
    item: string;
    completed: boolean;
    assignee?: string;
  }>;
}

// Domain & Hosting interface
export interface IDomainHosting {
  domain: {
    name?: string;
    provider?: string;
    registrationDate?: Date;
    expiryDate?: Date;
    status: 'available' | 'registered' | 'pending';
  };
  hosting: {
    provider?: string;
    plan?: string;
    server?: string;
    deploymentUrl?: string;
    status: 'not-configured' | 'configured' | 'deployed';
  };
  deployment: {
    platform?: string;
    lastDeployment?: Date;
    version?: string;
    logs: Array<{
      message: string;
      timestamp: Date;
      type: 'info' | 'warning' | 'error';
    }>;
  };
}

// Main Project interface
export interface IProject extends Document {
  name: string;
  description: string;
  owner: mongoose.Types.ObjectId;
  collaborators: Array<{
    user: mongoose.Types.ObjectId;
    role: 'owner' | 'editor' | 'viewer';
    addedAt: Date;
  }>;
  currentStage: number;
  stages: {
    ideation: IIdeation;
    problemDefinition: IProblemDefinition;
    solutionDefinition: ISolutionDefinition;
    audienceMarket: IAudienceMarket;
    technicalSpec: ITechnicalSpec;
    databaseDesign: IDatabaseDesign;
    wireframe: IWireframe;
    development: IDevelopment;
    goToMarket: IGoToMarket;
    domainHosting: IDomainHosting;
  };
  status: 'draft' | 'active' | 'completed' | 'archived';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Project Schema
const ProjectSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a project name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    collaborators: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        role: {
          type: String,
          enum: ['owner', 'editor', 'viewer'],
          default: 'viewer',
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    currentStage: {
      type: Number,
      default: 1,
      min: 1,
      max: 12,
    },
    stages: {
      ideation: {
        ideas: [
          {
            title: String,
            description: String,
            scores: {
              feasibility: { type: Number, min: 0, max: 10 },
              impact: { type: Number, min: 0, max: 10 },
              innovation: { type: Number, min: 0, max: 10 },
            },
            notes: [String],
            mindmap: Schema.Types.Mixed,
            createdAt: { type: Date, default: Date.now },
          },
        ],
      },
      problemDefinition: {
        problemStatement: String,
        personas: [
          {
            name: String,
            age: Number,
            occupation: String,
            goals: [String],
            frustrations: [String],
            avatar: String,
          },
        ],
        painPoints: [String],
        objectives: [
          {
            description: String,
            metric: String,
            target: String,
            deadline: Date,
          },
        ],
        attachments: [String],
      },
      solutionDefinition: {
        solutionOverview: String,
        keyFeatures: [
          {
            name: String,
            description: String,
            priority: {
              type: String,
              enum: ['high', 'medium', 'low'],
            },
            status: {
              type: String,
              enum: ['planned', 'in-progress', 'completed'],
              default: 'planned',
            },
          },
        ],
        alternatives: [
          {
            name: String,
            pros: [String],
            cons: [String],
            selected: Boolean,
          },
        ],
        mvp: {
          features: [String],
          timeline: String,
          resources: [String],
        },
      },
      audienceMarket: {
        marketSize: {
          tam: String,
          sam: String,
          som: String,
        },
        segments: [
          {
            name: String,
            size: String,
            characteristics: [String],
            priority: Number,
          },
        ],
        competitors: [
          {
            name: String,
            strengths: [String],
            weaknesses: [String],
            marketShare: String,
            url: String,
          },
        ],
        researchData: [Schema.Types.Mixed],
        charts: [Schema.Types.Mixed],
      },
      technicalSpec: {
        userStories: [
          {
            title: String,
            asA: String,
            iWant: String,
            soThat: String,
            acceptanceCriteria: [String],
            priority: {
              type: String,
              enum: ['high', 'medium', 'low'],
            },
          },
        ],
        functionalRequirements: [String],
        nonFunctionalRequirements: [String],
        diagrams: [
          {
            type: {
              type: String,
              enum: ['uml', 'flowchart', 'sequence', 'other'],
            },
            name: String,
            data: Schema.Types.Mixed,
            imageUrl: String,
          },
        ],
      },
      databaseDesign: {
        entities: [
          {
            name: String,
            attributes: [
              {
                name: String,
                type: String,
                required: Boolean,
                unique: Boolean,
              },
            ],
          },
        ],
        relationships: [
          {
            from: String,
            to: String,
            type: {
              type: String,
              enum: ['one-to-one', 'one-to-many', 'many-to-many'],
            },
            description: String,
          },
        ],
        erDiagram: Schema.Types.Mixed,
        sqlExport: String,
      },
      wireframe: {
        screens: [
          {
            name: String,
            type: {
              type: String,
              enum: ['low-fidelity', 'high-fidelity'],
            },
            elements: [Schema.Types.Mixed],
            imageUrl: String,
            notes: String,
          },
        ],
        prototype: {
          url: String,
          interactive: Boolean,
        },
      },
      development: {
        tasks: [
          {
            title: String,
            description: String,
            assignee: String,
            status: {
              type: String,
              enum: ['todo', 'in-progress', 'review', 'done'],
              default: 'todo',
            },
            priority: {
              type: String,
              enum: ['high', 'medium', 'low'],
            },
            dueDate: Date,
            tags: [String],
          },
        ],
        timeline: {
          startDate: Date,
          endDate: Date,
          milestones: [
            {
              name: String,
              date: Date,
              completed: Boolean,
            },
          ],
        },
        repositories: [
          {
            name: String,
            url: String,
            branch: String,
          },
        ],
        codeSnippets: [
          {
            title: String,
            language: String,
            code: String,
            notes: String,
          },
        ],
        bugs: [
          {
            title: String,
            description: String,
            severity: {
              type: String,
              enum: ['critical', 'high', 'medium', 'low'],
            },
            status: {
              type: String,
              enum: ['open', 'in-progress', 'resolved'],
              default: 'open',
            },
            reportedBy: String,
            reportedAt: { type: Date, default: Date.now },
          },
        ],
      },
      goToMarket: {
        launchDate: Date,
        marketingStrategy: {
          channels: [String],
          budget: String,
          campaigns: [
            {
              name: String,
              description: String,
              startDate: Date,
              endDate: Date,
              budget: String,
            },
          ],
        },
        betaTesting: {
          enabled: Boolean,
          testers: Number,
          feedback: [
            {
              user: String,
              comment: String,
              rating: { type: Number, min: 1, max: 5 },
              date: { type: Date, default: Date.now },
            },
          ],
        },
        successMetrics: [
          {
            name: String,
            target: String,
            current: String,
          },
        ],
        launchChecklist: [
          {
            item: String,
            completed: Boolean,
            assignee: String,
          },
        ],
      },
      domainHosting: {
        domain: {
          name: String,
          provider: String,
          registrationDate: Date,
          expiryDate: Date,
          status: {
            type: String,
            enum: ['available', 'registered', 'pending'],
            default: 'available',
          },
        },
        hosting: {
          provider: String,
          plan: String,
          server: String,
          deploymentUrl: String,
          status: {
            type: String,
            enum: ['not-configured', 'configured', 'deployed'],
            default: 'not-configured',
          },
        },
        deployment: {
          platform: String,
          lastDeployment: Date,
          version: String,
          logs: [
            {
              message: String,
              timestamp: { type: Date, default: Date.now },
              type: {
                type: String,
                enum: ['info', 'warning', 'error'],
              },
            },
          ],
        },
      },
    },
    status: {
      type: String,
      enum: ['draft', 'active', 'completed', 'archived'],
      default: 'draft',
    },
    tags: [String],
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
ProjectSchema.index({ owner: 1, status: 1 });
ProjectSchema.index({ 'collaborators.user': 1 });
ProjectSchema.index({ tags: 1 });

export default mongoose.model<IProject>('Project', ProjectSchema);

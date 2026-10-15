import { Response, NextFunction } from 'express';
import Project, { IProject } from '../models/project.model';
import { AuthRequest } from '../middleware/auth.middleware';

// @desc    Get all projects for a user
// @route   GET /api/projects
// @access  Private
export const getProjects = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { status, tags } = req.query;
    const query: any = {
      $or: [
        { owner: req.user.id },
        { 'collaborators.user': req.user.id },
      ],
    };

    if (status) {
      query.status = status;
    }

    if (tags) {
      query.tags = { $in: (tags as string).split(',') };
    }

    const projects = await Project.find(query)
      .populate('owner', 'name email avatar')
      .populate('collaborators.user', 'name email avatar')
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Private
export const getProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('owner', 'name email avatar')
      .populate('collaborators.user', 'name email avatar');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user has access to this project
    const hasAccess =
      project.owner._id.toString() === req.user.id ||
      project.collaborators.some(
        (collab) => collab.user._id.toString() === req.user.id
      );

    if (!hasAccess) {
      return res.status(403).json({ message: 'Not authorized to access this project' });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
export const createProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name, description, tags } = req.body;

    const project = await Project.create({
      name,
      description,
      owner: req.user.id,
      tags: tags || [],
      stages: {
        ideation: { ideas: [] },
        problemDefinition: { personas: [], painPoints: [], objectives: [], attachments: [] },
        solutionDefinition: { keyFeatures: [], alternatives: [], mvp: { features: [], resources: [] } },
        audienceMarket: { marketSize: {}, segments: [], competitors: [], researchData: [], charts: [] },
        technicalSpec: { userStories: [], functionalRequirements: [], nonFunctionalRequirements: [], diagrams: [] },
        databaseDesign: { entities: [], relationships: [] },
        wireframe: { screens: [] },
        development: { tasks: [], timeline: { milestones: [] }, repositories: [], codeSnippets: [], bugs: [] },
        goToMarket: { marketingStrategy: { channels: [], campaigns: [] }, betaTesting: { enabled: false, testers: 0, feedback: [] }, successMetrics: [], launchChecklist: [] },
        domainHosting: { domain: { status: 'available' }, hosting: { status: 'not-configured' }, deployment: { logs: [] } },
      },
    });

    const populatedProject = await Project.findById(project._id)
      .populate('owner', 'name email avatar');

    res.status(201).json({
      success: true,
      data: populatedProject,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
export const updateProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is owner or editor
    const isOwner = project.owner.toString() === req.user.id;
    const isEditor = project.collaborators.some(
      (collab) =>
        collab.user.toString() === req.user.id && collab.role === 'editor'
    );

    if (!isOwner && !isEditor) {
      return res.status(403).json({ message: 'Not authorized to update this project' });
    }

    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('owner', 'name email avatar')
      .populate('collaborators.user', 'name email avatar');

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
export const deleteProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Only owner can delete
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this project' });
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update project stage
// @route   PUT /api/projects/:id/stage/:stageName
// @access  Private
export const updateProjectStage = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id, stageName } = req.params;
    const stageData = req.body;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user has edit access
    const isOwner = project.owner.toString() === req.user.id;
    const isEditor = project.collaborators.some(
      (collab) =>
        collab.user.toString() === req.user.id && collab.role === 'editor'
    );

    if (!isOwner && !isEditor) {
      return res.status(403).json({ message: 'Not authorized to update this project' });
    }

    // Update the specific stage
    (project.stages as any)[stageName] = {
      ...(project.stages as any)[stageName],
      ...stageData,
    };

    await project.save();

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add collaborator to project
// @route   POST /api/projects/:id/collaborators
// @access  Private
export const addCollaborator = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { userId, role } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Only owner can add collaborators
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to add collaborators' });
    }

    // Check if user is already a collaborator
    const existingCollaborator = project.collaborators.find(
      (collab) => collab.user.toString() === userId
    );

    if (existingCollaborator) {
      return res.status(400).json({ message: 'User is already a collaborator' });
    }

    project.collaborators.push({
      user: userId,
      role: role || 'viewer',
      addedAt: new Date(),
    });

    await project.save();

    const updatedProject = await Project.findById(project._id)
      .populate('owner', 'name email avatar')
      .populate('collaborators.user', 'name email avatar');

    res.status(200).json({
      success: true,
      data: updatedProject,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove collaborator from project
// @route   DELETE /api/projects/:id/collaborators/:userId
// @access  Private
export const removeCollaborator = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id, userId } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Only owner can remove collaborators
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to remove collaborators' });
    }

    project.collaborators = project.collaborators.filter(
      (collab) => collab.user.toString() !== userId
    );

    await project.save();

    const updatedProject = await Project.findById(project._id)
      .populate('owner', 'name email avatar')
      .populate('collaborators.user', 'name email avatar');

    res.status(200).json({
      success: true,
      data: updatedProject,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Export project data
// @route   GET /api/projects/:id/export
// @access  Private
export const exportProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('owner', 'name email avatar')
      .populate('collaborators.user', 'name email avatar');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user has access
    const hasAccess =
      project.owner._id.toString() === req.user.id ||
      project.collaborators.some(
        (collab) => collab.user._id.toString() === req.user.id
      );

    if (!hasAccess) {
      return res.status(403).json({ message: 'Not authorized to access this project' });
    }

    // Return project data for export
    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get project analytics
// @route   GET /api/projects/:id/analytics
// @access  Private
export const getProjectAnalytics = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user has access
    const hasAccess =
      project.owner.toString() === req.user.id ||
      project.collaborators.some(
        (collab) => collab.user.toString() === req.user.id
      );

    if (!hasAccess) {
      return res.status(403).json({ message: 'Not authorized to access this project' });
    }

    // Calculate analytics
    const analytics = {
      totalIdeas: project.stages.ideation.ideas.length,
      totalPersonas: project.stages.problemDefinition.personas.length,
      totalFeatures: project.stages.solutionDefinition.keyFeatures.length,
      completedFeatures: project.stages.solutionDefinition.keyFeatures.filter(
        (f) => f.status === 'completed'
      ).length,
      totalTasks: project.stages.development.tasks.length,
      completedTasks: project.stages.development.tasks.filter(
        (t) => t.status === 'done'
      ).length,
      totalBugs: project.stages.development.bugs.length,
      openBugs: project.stages.development.bugs.filter(
        (b) => b.status === 'open'
      ).length,
      progressPercentage: (project.currentStage / 12) * 100,
      collaboratorsCount: project.collaborators.length,
    };

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    next(error);
  }
};

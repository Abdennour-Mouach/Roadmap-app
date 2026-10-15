import { Router } from 'express';
import { body } from 'express-validator';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  updateProjectStage,
  addCollaborator,
  removeCollaborator,
  exportProject,
  getProjectAnalytics,
} from '../controllers/project.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// All routes are protected
router.use(protect);

// Project CRUD routes
router
  .route('/')
  .get(getProjects)
  .post(
    [
      body('name', 'Project name is required').not().isEmpty(),
      body('description', 'Project description is required').not().isEmpty(),
    ],
    createProject
  );

router
  .route('/:id')
  .get(getProject)
  .put(updateProject)
  .delete(deleteProject);

// Stage-specific routes
router.put('/:id/stage/:stageName', updateProjectStage);

// Collaborator routes
router.post(
  '/:id/collaborators',
  [
    body('userId', 'User ID is required').not().isEmpty(),
    body('role', 'Role must be owner, editor, or viewer').isIn([
      'owner',
      'editor',
      'viewer',
    ]),
  ],
  addCollaborator
);

router.delete('/:id/collaborators/:userId', removeCollaborator);

// Export and analytics
router.get('/:id/export', exportProject);
router.get('/:id/analytics', getProjectAnalytics);

export default router;

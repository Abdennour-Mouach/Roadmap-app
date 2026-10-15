import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Project {
  _id: string;
  name: string;
  description: string;
  owner: any;
  collaborators: any[];
  currentStage: number;
  stages: any;
  status: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null;
  analytics: any;
}

const initialState: ProjectState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
  analytics: null,
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

// Async thunks
export const fetchProjects = createAsyncThunk(
  'project/fetchProjects',
  async (filters?: { status?: string; tags?: string }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams(filters as any).toString();
      const response = await axios.get(`/api/projects?${params}`, getAuthHeaders());
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch projects');
    }
  }
);

export const fetchProject = createAsyncThunk(
  'project/fetchProject',
  async (projectId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/projects/${projectId}`, getAuthHeaders());
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch project');
    }
  }
);

export const createProject = createAsyncThunk(
  'project/createProject',
  async (projectData: { name: string; description: string; tags?: string[] }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/projects', projectData, getAuthHeaders());
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create project');
    }
  }
);

export const updateProject = createAsyncThunk(
  'project/updateProject',
  async ({ projectId, data }: { projectId: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/projects/${projectId}`, data, getAuthHeaders());
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update project');
    }
  }
);

export const updateProjectStage = createAsyncThunk(
  'project/updateProjectStage',
  async (
    { projectId, stageName, stageData }: { projectId: string; stageName: string; stageData: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `/api/projects/${projectId}/stage/${stageName}`,
        stageData,
        getAuthHeaders()
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update stage');
    }
  }
);

export const deleteProject = createAsyncThunk(
  'project/deleteProject',
  async (projectId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/projects/${projectId}`, getAuthHeaders());
      return projectId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete project');
    }
  }
);

export const addCollaborator = createAsyncThunk(
  'project/addCollaborator',
  async (
    { projectId, userId, role }: { projectId: string; userId: string; role: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `/api/projects/${projectId}/collaborators`,
        { userId, role },
        getAuthHeaders()
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add collaborator');
    }
  }
);

export const removeCollaborator = createAsyncThunk(
  'project/removeCollaborator',
  async ({ projectId, userId }: { projectId: string; userId: string }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/api/projects/${projectId}/collaborators/${userId}`,
        getAuthHeaders()
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove collaborator');
    }
  }
);

export const fetchProjectAnalytics = createAsyncThunk(
  'project/fetchAnalytics',
  async (projectId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/projects/${projectId}/analytics`, getAuthHeaders());
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch analytics');
    }
  }
);

// Slice
const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    clearCurrentProject: (state) => {
      state.currentProject = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Projects
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Project
    builder
      .addCase(fetchProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProject.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProject = action.payload;
      })
      .addCase(fetchProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create Project
    builder
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.unshift(action.payload);
        state.currentProject = action.payload;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update Project
    builder
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProject = action.payload;
        const index = state.projects.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update Project Stage
    builder
      .addCase(updateProjectStage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProjectStage.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProject = action.payload;
      })
      .addCase(updateProjectStage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete Project
    builder
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.filter((p) => p._id !== action.payload);
        if (state.currentProject?._id === action.payload) {
          state.currentProject = null;
        }
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Add Collaborator
    builder
      .addCase(addCollaborator.fulfilled, (state, action) => {
        state.currentProject = action.payload;
      });

    // Remove Collaborator
    builder
      .addCase(removeCollaborator.fulfilled, (state, action) => {
        state.currentProject = action.payload;
      });

    // Fetch Analytics
    builder
      .addCase(fetchProjectAnalytics.fulfilled, (state, action) => {
        state.analytics = action.payload;
      });
  },
});

export const { clearCurrentProject, clearError } = projectSlice.actions;
export default projectSlice.reducer;

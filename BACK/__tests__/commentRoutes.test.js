const { PrismaClient } = require('@prisma/client');
const {
  getComments,
  createComment,
  deleteComment,
  updateComment,
  getCommentById
} = require('../controllers/commentController');

// Mock PrismaClient
jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    comment: {
      findMany: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
      deleteMany: jest.fn(),
      createMany: jest.fn()
    }
  };
  return { PrismaClient: jest.fn(() => mockPrismaClient) };
});

const prisma = new PrismaClient();

describe('Comment Controller', () => {
  let req, res;

  beforeEach(() => {
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getComments', () => {
    beforeEach(() => {
      prisma.comment.findMany.mockResolvedValue([
        {
          idComment: '1',
          content: 'Comment 1',
          author: { id: '1' },
          resource: {},
          replies: [],
          parentComment: null,
        },
        {
          idComment: '2',
          content: 'Comment 2',
          author: { id: '2' },
          resource: {},
          replies: [],
          parentComment: { content: 'Comment 1' },
        },
        {
          idComment: '3',
          content: 'Comment 3',
          author: { id: '3' },
          resource: {},
          replies: [],
          parentComment: { content: 'Comment 2' },
        }
      ]);
    });

    it('should return all comments with their relations', async () => {
      await getComments(req, res);
      expect(res.json).toHaveBeenCalledWith([
        {
          idComment: '1',
          content: 'Comment 1',
          author: { id: '1' },
          resource: {},
          replies: [],
          parentComment: null,
        },
        {
          idComment: '2',
          content: 'Comment 2',
          author: { id: '2' },
          resource: {},
          replies: [],
          parentComment: { content: 'Comment 1' },
        },
        {
          idComment: '3',
          content: 'Comment 3',
          author: { id: '3' },
          resource: {},
          replies: [],
          parentComment: { content: 'Comment 2' },
        }
      ]);
      expect(prisma.comment.findMany).toHaveBeenCalledWith({
        include: {
          author: true,
          resource: true,
          replies: true,
          parentComment: true,
        },
      });
    });

    it('should handle errors and return a 500 status code when an error occurs', async () => {
      prisma.comment.findMany.mockRejectedValue(new Error('Database error'));
      await getComments(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Une erreur s'est produite lors de la récupération des commentaires.",
      });
    });

    it('should return an empty array when no comments are found', async () => {
      prisma.comment.findMany.mockResolvedValue([]);
      await getComments(req, res);
      expect(res.json).toHaveBeenCalledWith([]);
    });
  });

  describe('createComment', () => {
    it('should create a comment and return it', async () => {
      const req = {
        body: {
          content: 'Test content',
          resourceId: 1,
          authorId: 1,
          parentId: null,
        },
      };
      const mockComment = {
        idComment: '1',
        content: 'Test content',
        authorId: 1,
        resourceId: 1,
        parentId: null,
      };
      prisma.comment.create.mockResolvedValue(mockComment);

      await createComment(req, res);

      expect(prisma.comment.create).toHaveBeenCalledWith({
        data: {
          content: 'Test content',
          authorId: 1,
          resourceId: 1,
          parentId: null,
        },
      });
      expect(res.json).toHaveBeenCalledWith(mockComment);
    });
    
    it('should return 500 when creating a comment with missing data', async () => {
      const commentData = {
        content: '',
        resourceId: 1,
        authorId: 1,
        parentId: null,
      };

      prisma.comment.create.mockRejectedValue(new Error('Database error'));

      req = { body: commentData };

      await createComment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Une erreur s'est produite lors de la création du commentaire.",
      });
    });

    it('should return 500 when creating a comment with invalid data', async () => {
      const commentData = {
        content: 'valid content',
        resourceId: 'invalid',
        authorId: 'invalid',
        parentId: 'invalid',
      };

      prisma.comment.create.mockRejectedValue(new Error('Database error'));

      req = { body: commentData };

      await createComment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Une erreur s'est produite lors de la création du commentaire.",
      });
    });

    it('should return 500 when creating a comment with non-existing author', async () => {
      const commentData = {
        content: 'Test comment',
        resourceId: 1,
        authorId: 999, // Simulate non-existing author
        parentId: null,
      };

      prisma.comment.create.mockRejectedValue(new Error('Database error'));

      req = { body: commentData };

      await createComment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Une erreur s'est produite lors de la création du commentaire.",
      });
    });

    it('should return 500 when creating a comment with non-existing resource', async () => {
      const commentData = {
        content: 'Test comment',
        resourceId: 999, // Simulate non-existing resource
        authorId: 1,
        parentId: null,
      };

      prisma.comment.create.mockRejectedValue(new Error('Database error'));

      req = { body: commentData };

      await createComment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Une erreur s'est produite lors de la création du commentaire.",
      });
    });
  });

  describe('deleteComment', () => {
    it('should delete a comment and return it', async () => {
      const req = {
        body: {
          idComment: '1',
        },
      };
      const mockComment = {
        idComment: '1',
        content: 'Test content',
        authorId: 1,
        resourceId: 1,
        parentId: null,
      };
      prisma.comment.delete.mockResolvedValue(mockComment);

      await deleteComment(req, res);

      expect(prisma.comment.delete).toHaveBeenCalledWith({
        where: { idComment: '1' },
      });
      expect(res.json).toHaveBeenCalledWith(mockComment);
    });

    it('should handle errors and return a 500 status code when deletion fails', async () => {
      const req = {
        body: {
          idComment: '1',
        },
      };
      prisma.comment.delete.mockRejectedValue(new Error('Database error'));

      await deleteComment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Une erreur s'est produite lors de la suppression du commentaire.",
      });
    });
  });

  describe('updateComment', () => {
    it('should update a comment and return it', async () => {
      const req = {
        body: {
          idComment: '1',
          content: 'Updated content',
        },
      };
      const mockComment = {
        idComment: '1',
        content: 'Updated content',
        authorId: 1,
        resourceId: 1,
        parentId: null,
      };
      prisma.comment.update.mockResolvedValue(mockComment);

      await updateComment(req, res);

      expect(prisma.comment.update).toHaveBeenCalledWith({
        where: { idComment: '1' },
        data: { content: 'Updated content' },
      });
      expect(res.json).toHaveBeenCalledWith(mockComment);
    });

    it('should handle errors and return a 500 status code when updating fails', async () => {
      const req = {
        body: {
          idComment: '1',
          content: 'Updated content',
        },
      };
      prisma.comment.update.mockRejectedValue(new Error('Database error'));

      await updateComment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Une erreur s'est produite lors de la mise à jour du commentaire.",
      });
    });
  });

  describe('getCommentById', () => {
    it('should return a comment by its ID', async () => {
      const req = {
        body: {
          idComment: '1',
        },
      };
      const mockComment = {
        idComment: '1',
        content: 'Comment 1',
        author: { id: '1' },
        resource: {},
        replies: [],
        parentComment: null,
      };
      prisma.comment.findUnique.mockResolvedValue(mockComment);

      await getCommentById(req, res);

      expect(prisma.comment.findUnique).toHaveBeenCalledWith({
        where: { idComment: '1' },
        include: {
          author: true,
          resource: true,
          replies: true,
          parentComment: true,
        },
      });
      expect(res.json).toHaveBeenCalledWith(mockComment);
    });

    it('should handle errors and return a 500 status code when retrieving by ID fails', async () => {
      const req = {
        body: {
          idComment: '1',
        },
      };
      prisma.comment.findUnique.mockRejectedValue(new Error('Database error'));

      await getCommentById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Une erreur s'est produite lors de la récupération du commentaire.",
      });
    });
  });
});

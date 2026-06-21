class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
  }
}

//user sent invalid data
class BadRequestError extends AppError {
  constructor(message) {
    super(message, 400);
  }
}

//user is not authenticated
class UnauthorizedError extends AppError {
  constructor(message) {
    super(message, 401);
  }
}

// user is logged in but dont have permission
class ForbiddenError extends AppError {
  constructor(message) {
    super(message, 403);
  }
}

//resource not found
class NotFoundError extends AppError {
  constructor(message) {
    super(message, 404);
  }
}

//resource already exists
class ConflictError extends AppError {
  constructor(message) {
    super(message, 409);
  }
}

module.exports = {
  AppError,
  ConflictError,
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
  BadRequestError,
};

import { HttpException, HttpStatus } from '@nestjs/common';

export function successResponse(
    result: any,
    message: string,
    statusCode: HttpStatus
  ):any {
    return {
      success: 1,
      statusCode,
      result,
      message,
    };
  }

export function errorResponse(
  result: any = null,
  message: string,
  statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
): never {
  throw new HttpException(
    {
      success: 0,
      statusCode: statusCode,
      message,
      result: result,
    },
    statusCode,
  );
}

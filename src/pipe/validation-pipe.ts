import { Injectable, ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ValidationException } from "src/exceptions/validation-exception";

@Injectable()
export class MyValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToInstance(metadata.metatype, value);
    const error = await validate(obj);
    if (error.length) {
      let messages = error.map((err) => {
        return `${err.property} - ${Object.values(err.constraints).join(
          ", |",
        )}`;
      });
      throw new ValidationException(messages);
    }
    return value;
  }
}

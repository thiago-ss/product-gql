import { Field, InputType, Int, Float } from "type-graphql";
import { IsNotEmpty, IsInt, Min, Max, IsUrl } from "class-validator";

@InputType()
export class ReviewInput {
  @Field()
  @IsNotEmpty()
  user: string;

  @Field()
  @IsNotEmpty()
  description: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @Field()
  @IsNotEmpty()
  date: string;
}

@InputType()
export class ProductInput {
  @Field()
  @IsUrl()
  imageUrl: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @Field(() => Float)
  @IsNotEmpty()
  price: number;

  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  description: string;

  @Field()
  @IsNotEmpty()
  category: string;

  @Field(() => [ReviewInput])
  reviews: ReviewInput[];
}

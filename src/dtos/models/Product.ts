import { Field, Float, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true }) // Make the name field optional
  name?: string;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field({ nullable: true })
  category?: string;

  @Field(() => Float, { nullable: true })
  reviewRating?: number;

  @Field(() => Date)
  createdAt: Date;
}

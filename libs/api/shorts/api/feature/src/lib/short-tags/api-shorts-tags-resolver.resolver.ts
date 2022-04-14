import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import {
  Short,
  ShortCreateTagInput,
  ShortTag,
} from '@graduates/api/shorts/api/shared/entities/data-access';
import { ShortsTagsService } from '@graduates/api/shorts/service/feature';

@Resolver(Short)
export class ShortsTagsResolver {
  constructor(private readonly service: ShortsTagsService) {}

  @Query(() => [ShortTag])
  async getAllTags(): Promise<ShortTag[]> {
    return await this.service.findAllTags();
  }

  @Query(() => [ShortTag])
  async getTagsByShortId(@Args('id') id: string): Promise<ShortTag[]> {
    return await this.service.findTagsByShortId(id);
  }

  @Mutation(() => ShortTag)
  async createTag(@Args('tag') tag: ShortCreateTagInput): Promise<ShortTag> {
    return await this.service.createTag(tag);
  }

  @Mutation(() => String)
  async updateTags(
    @Args('tag') tag: string,
    @Args('newTag') newTag: string
  ): Promise<string> {
    return await this.service.updateTags(tag, newTag);
  }

  @Mutation(() => String)
  async updateTagByShortId(
    @Args('shortId') shortId: string,
    @Args('tag') tag: string,
    @Args('newTag') newTag: string
  ): Promise<string> {
    return await this.service.updateTagByShortId(shortId, tag, newTag);
  }

  @Mutation(() => String)
  async deleteTagsByTag(@Args('tag') tag: string): Promise<string> {
    return await this.service.deleteTags(tag);
  }

  @Mutation(() => String)
  async deleteAllTagsForShort(
    @Args('shortId') shortId: string
  ): Promise<string> {
    return await this.service.deleteTagsByShortId(shortId);
  }

  @Mutation(() => String)
  async deleteTag(
    @Args('shortId') shortId: string,
    @Args('tag') tag: string
  ): Promise<string> {
    return await this.service.deleteTagByShortTag(shortId, tag);
  }
}

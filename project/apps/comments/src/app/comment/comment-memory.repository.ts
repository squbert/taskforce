import { randomUUID } from 'node:crypto';
import { CRUDRepository } from '@project/util/util-types';
import { CommentEntity } from './comment.entity';
import { Injectable } from '@nestjs/common';
import { Comment } from '@project/shared/app-types';

@Injectable()
export class CommentMemoryRepository implements CRUDRepository<CommentEntity, string, Comment> {
  private repository: Record<string, Comment> = {};

  public async create(item: CommentEntity): Promise<Comment> {
    const entry = { ...item.toObject(), _id: randomUUID()};
    this.repository[entry._id] = entry;

    return entry;
  }

  public async findById(id: string): Promise<Comment> {
    if(this.repository[id]) {
      return { ...this.repository[id]};
    }

    return null;
  }

  public async update(id: string, item: CommentEntity): Promise<Comment> {
    this.repository[id] = { ...item.toObject(), _id: id};
    return this.findById(id);
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }
}
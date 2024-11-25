import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prismaClient: PrismaService) {}

  async getUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<{ data: User | null }> {
    const user = await this.prismaClient.user.findUnique({
      where: userWhereUniqueInput,
    });
    return { data: user ? user : null };
  }

  async createUser(data: Prisma.UserCreateInput): Promise<{ data: User }> {
    const user = await this.prismaClient.user.create({ data });
    return { data: user };
  }
}

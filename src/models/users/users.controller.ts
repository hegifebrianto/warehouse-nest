import {
	BadRequestException,
	Body,
	Controller,
	ForbiddenException,
	Get,
	NotFoundException,
	Param,
	Put,
	Req,
	UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Types } from 'mongoose';
import { PrivateUserDto, UserDto } from '../../common/types';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { ParseObjectIdPipe } from '../../pipes/prase-object-id.pipe';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
@ApiTags('users')
@UseGuards(JwtAuthGuard) // this will read Bearer token
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get('me')
	@ApiOperation({ summary: 'Get authenticated user data' })
	async findAuthenticated(@Req() request: Request): Promise<PrivateUserDto> {
		const userId = new Types.ObjectId(request.user.sub);
		const user = await this.usersService.findById(userId);

		if (!user) {
			throw new NotFoundException();
		}

		return User.toPrivateDto(user);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get user data by id' })
	async findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId): Promise<UserDto> {
		const user = await this.usersService.findById(id);

		if (!user) {
			throw new NotFoundException();
		}

		return User.toDto(user);
	}

	@Put()
	@ApiOperation({ summary: 'Update authenticated user profile' })
	async updateProfile(@Req() request: Request, @Body() dto: UpdateUserDto) {
		const userId = new Types.ObjectId(request.user.sub);

		const user = await this.usersService.findById(userId);
		if (!user) {
			throw new NotFoundException();
		}

		if (dto.username != user.profile.username) {
			if (user.profile.isDemo) {
				throw new ForbiddenException('This action is not available for demo accounts');
			}

			// Username taken check should ideally be an DTO decorator.
			// But since this project is designed to use PUT requests.
			// Users won't be able to update their username, since it will
			// always be taken, by them
			const usernameTaken = await this.usersService.isUsernameTaken(dto.username);
			if (usernameTaken) {
				throw new BadRequestException('This username is already taken');
			}
		}

		const updatedUser = await this.usersService.updateProfile(userId, dto);
		return User.toPrivateDto(updatedUser);
	}
}

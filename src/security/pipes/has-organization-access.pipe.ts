import { ForbiddenException, Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Types } from 'mongoose';
import { SecurityService } from '../security.service';

@Injectable({ scope: Scope.REQUEST })
export class HasOrganizationAccessPipe implements PipeTransform<Types.ObjectId> {
	constructor(
		@Inject(REQUEST) private readonly request: Request,
		private readonly securityService: SecurityService,
	) { }

	async transform(value: Types.ObjectId): Promise<Types.ObjectId> {

		const user: any = this.request.user;
		const userIdString = user?.sub;

		if (!userIdString) {
			throw new ForbiddenException('Invalid user token: missing user ID');
		}

		const userId = new Types.ObjectId(userIdString);
		const hasAccess = await this.securityService.hasOrganizationAccess(value, userId);
		console.log(hasAccess, 'hasaccess');

		console.log('User:', this.request.user);
		console.log('Org ID:', value.toHexString());
		console.log('Has access:', hasAccess);
		if (!hasAccess) {
			throw new ForbiddenException('Organization access denied');
		}

		return value;
	}


}

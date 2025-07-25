import {
	ForbiddenException,
	Inject,
	Injectable,
	NotFoundException,
	PipeTransform,
	Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Types } from 'mongoose';
import { OrganizationResolverService } from '../../organization-resolver/organization-resolver.service';
import { OrganizationResourceType } from '../../organization-resolver/types/organization-resource.type';
import { SecurityService } from '../security.service';

@Injectable({ scope: Scope.REQUEST })
export class HasInventoryAccessPipe implements PipeTransform<Types.ObjectId> {
	constructor(
		@Inject(REQUEST) private readonly request: Request,
		private readonly securityService: SecurityService,
		private readonly organizationResolverService: OrganizationResolverService,
	) {}

	async transform(value: Types.ObjectId): Promise<Types.ObjectId> {
		const userId = new Types.ObjectId(this.request.user.sub);

		const organization = await this.organizationResolverService.resolve(
			value,
			OrganizationResourceType.INVENTORY,
		);
		if (!organization) {
			throw new NotFoundException(`This inventory item doesn't exist`);
		}

		const hasAccess = await this.securityService.hasOrganizationAccess(organization, userId);
		if (!hasAccess) {
			throw new ForbiddenException('Inventory item access denied');
		}

		return value;
	}
}

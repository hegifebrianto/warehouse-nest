import { ICreateWarehouseDto } from "../../types"

export interface ICreateOrganizationDto {
    name: string
    warehouse: ICreateWarehouseDto
}

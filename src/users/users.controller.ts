import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard, Roles } from 'src/common/guards/roles.guards';
import { UpdateUserDto, UpdateUserRoleDto } from './update-user.dto';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getMe(@Req() req) {
        return this.usersService.findById(req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('me')
    updateMe(@Req() req, @Body() dto: UpdateUserDto) {
        return this.usersService.update(req.user.userId, dto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('me')
    deleteMe(@Req() req) {
        return this.usersService.delete(req.user.userId);
    }

    // Admin-only
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.usersService.findById(id);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Delete(':id')
    deleteOne(@Param('id') id: number) {
        return this.usersService.delete(id);
    }
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Patch(':id/role')
    updateRole(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserRoleDto) {
        return this.usersService.update(id, dto);
    }
}

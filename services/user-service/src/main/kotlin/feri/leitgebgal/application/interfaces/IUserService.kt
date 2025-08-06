package feri.leitgebgal.application.interfaces

import feri.leitgebgal.application.dtos.UserDto
import feri.leitgebgal.models.User

interface IUserService {
    fun getAllUsers(): List<User>
    fun getUserById(id: String): User?
    fun loginUser(dto: UserDto): Boolean
    fun registerUser(dto: UserDto): User
    fun deleteUserById(id: String) : Boolean
}
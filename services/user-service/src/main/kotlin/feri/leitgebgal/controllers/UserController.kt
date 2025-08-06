package feri.leitgebgal.controllers

import feri.leitgebgal.application.dtos.UserDto
import feri.leitgebgal.application.services.UserService
import jakarta.ws.rs.*

@Path("/")
class UserController(private val userService: UserService) {
    @GET
    @Path("/users")
    fun getAllUsers() = userService.getAllUsers()

    @GET
    @Path("/users/{id}")
    fun getUserById(@PathParam("id") id: String) = userService.getUserById(id)

    @POST
    @Path("/users/login")
    fun loginUser(dto: UserDto) = userService.loginUser(dto)

    @POST
    @Path("/users/register")
    fun registerUser(dto: UserDto) = userService.registerUser(dto)

    @DELETE
    @Path("/users/{id}")
    fun deleteUserById(@PathParam("id") id: String) = userService.deleteUserById(id)
}
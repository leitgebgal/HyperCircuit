package feri.leitgebgal.application.dtos

data class UserDto (
    val id: String? = null,
    val username: String = "",
    val email: String = "",
    val password: String = ""
)
package feri.leitgebgal.application.services

import feri.leitgebgal.application.dtos.UserDto
import feri.leitgebgal.application.interfaces.IUserService
import feri.leitgebgal.models.User
import feri.leitgebgal.repository.UserRepository
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import org.bson.types.ObjectId
import org.slf4j.Logger
import org.slf4j.LoggerFactory


@ApplicationScoped
class UserService : IUserService {
    private val logger: Logger = LoggerFactory.getLogger(UserService::class.java)

    @Inject
    private lateinit var userRepository: UserRepository


    override fun getAllUsers(): List<User> {
        val users = userRepository.findAll().list<User>()

        logger.info("Found users: $users")

        return users
    }

    override fun getUserById(id: String): User? {
        val user = userRepository.findById(ObjectId(id)) ?: return null

        logger.info("Found user: $user")

        return user
    }


    override fun loginUser(dto: UserDto): Boolean {
        val user = userRepository.findById(ObjectId(dto.id!!))
        val match = user != null && user.password == dto.password

        logger.info("User logged in: $match")

        return match
    }

    override fun registerUser(dto: UserDto): User {
        val user = User(
            username = dto.username,
            email = dto.email,
            password = dto.password
        )

        userRepository.persist(user)

        logger.info("User registered: $user")

        return user
    }

    override fun deleteUserById(id: String): Boolean {
        val user = userRepository.findById(ObjectId(id))

        if (user != null) {
            userRepository.delete(user)
            logger.info("User deleted: $user")
            return true
        }

        logger.info("User not found")
        return false
    }
}
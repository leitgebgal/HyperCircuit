package feri.leitgebgal.application.services

import feri.leitgebgal.UserOuterClass
import feri.leitgebgal.UserServiceGrpc
import io.grpc.stub.StreamObserver
import io.quarkus.grpc.GrpcService

@GrpcService
class UserServiceGrpcImpl(private val userService: UserService) : UserServiceGrpc.UserServiceImplBase() {
    override fun getAllUsers(
        request: UserOuterClass.Empty,
        responseObserver: StreamObserver<UserOuterClass.UserList?>?
    ) {
        super.getAllUsers(request, responseObserver)
    }

    override fun getUserById(
        request: UserOuterClass.UserIdRequest?,
        responseObserver: StreamObserver<UserOuterClass.User?>?
    ) {
        super.getUserById(request, responseObserver)
    }

    override fun login(
        request: UserOuterClass.User?,
        responseObserver: StreamObserver<UserOuterClass.StatusResponse?>?
    ) {
        super.login(request, responseObserver)
    }

    override fun register(
        request: UserOuterClass.User?,
        responseObserver: StreamObserver<UserOuterClass.StatusResponse?>?
    ) {
        super.register(request, responseObserver)
    }

    override fun deleteUser(
        request: UserOuterClass.UserIdRequest?,
        responseObserver: StreamObserver<UserOuterClass.StatusResponse?>?
    ) {
        super.deleteUser(request, responseObserver)
    }
}
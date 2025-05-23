/**
 * NOTE: This class is auto generated by the swagger code generator program (3.0.68).
 * https://github.com/swagger-api/swagger-codegen
 * Do not edit the class manually.
 */
package io.swagger.api;

import io.swagger.model.AuthLogoutBody;
import io.swagger.model.AuthRefreshtokenBody;
import io.swagger.model.ChangeEmailRequest;
import io.swagger.model.ChangePasswordRequest;
import io.swagger.model.DeleteAccountRequest;
import io.swagger.model.LoginRequest;
import io.swagger.model.LoginResponseDTO;
import io.swagger.model.RegisterRequest;
import io.swagger.model.ResponseDTO;
import io.swagger.model.UserDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.CookieValue;

import javax.validation.Valid;
import javax.validation.constraints.*;
import java.util.List;
import java.util.Map;

@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-05-15T10:20:28.371833724Z[GMT]")
@Validated
public interface AuthApi {

    @Operation(summary = "Change user email", description = "", tags={ "Authentication" })
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Email changed", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ResponseDTO.class))),
        
        @ApiResponse(responseCode = "401", description = "Unauthorized") })
    @RequestMapping(value = "/auth/change-email",
        produces = { "application/json" }, 
        consumes = { "application/json" }, 
        method = RequestMethod.PUT)
    ResponseEntity<ResponseDTO> authChangeEmailPut(@Parameter(in = ParameterIn.DEFAULT, description = "", required=true, schema=@Schema()) @Valid @RequestBody ChangeEmailRequest body
);


    @Operation(summary = "Change user password", description = "", tags={ "Authentication" })
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Password changed", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ResponseDTO.class))),
        
        @ApiResponse(responseCode = "401", description = "Unauthorized") })
    @RequestMapping(value = "/auth/change-password",
        produces = { "application/json" }, 
        consumes = { "application/json" }, 
        method = RequestMethod.PUT)
    ResponseEntity<ResponseDTO> authChangePasswordPut(@Parameter(in = ParameterIn.DEFAULT, description = "", required=true, schema=@Schema()) @Valid @RequestBody ChangePasswordRequest body
);


    @Operation(summary = "Delete user account", description = "", tags={ "Authentication" })
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Account deleted", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ResponseDTO.class))),
        
        @ApiResponse(responseCode = "401", description = "Unauthorized") })
    @RequestMapping(value = "/auth/delete-account",
        produces = { "application/json" }, 
        consumes = { "application/json" }, 
        method = RequestMethod.DELETE)
    ResponseEntity<ResponseDTO> authDeleteAccountDelete(@Parameter(in = ParameterIn.DEFAULT, description = "", required=true, schema=@Schema()) @Valid @RequestBody DeleteAccountRequest body
);


    @Operation(summary = "Send forgot password email", description = "", tags={ "Authentication" })
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Reset link sent", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ResponseDTO.class))),
        
        @ApiResponse(responseCode = "400", description = "Error sending reset link") })
    @RequestMapping(value = "/auth/forgot-password",
        produces = { "application/json" }, 
        method = RequestMethod.POST)
    ResponseEntity<ResponseDTO> authForgotPasswordPost(@NotNull @Parameter(in = ParameterIn.QUERY, description = "" ,required=true,schema=@Schema()) @Valid @RequestParam(value = "email", required = true) String email
);


    @Operation(summary = "User login", description = "", tags={ "Authentication" })
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Successful login", content = @Content(mediaType = "application/json", schema = @Schema(implementation = LoginResponseDTO.class))),
        
        @ApiResponse(responseCode = "401", description = "Invalid credentials") })
    @RequestMapping(value = "/auth/login",
        produces = { "application/json" }, 
        consumes = { "application/json" }, 
        method = RequestMethod.POST)
    ResponseEntity<LoginResponseDTO> authLoginPost(@Parameter(in = ParameterIn.DEFAULT, description = "", required=true, schema=@Schema()) @Valid @RequestBody LoginRequest body
);


    @Operation(summary = "Revoke refresh token", description = "", tags={ "Authentication" })
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "204", description = "Token revoked") })
    @RequestMapping(value = "/auth/logout",
        consumes = { "application/json" }, 
        method = RequestMethod.POST)
    ResponseEntity<Void> authLogoutPost(@Parameter(in = ParameterIn.DEFAULT, description = "", required=true, schema=@Schema()) @Valid @RequestBody AuthLogoutBody body
);


    @Operation(summary = "Refresh JWT token", description = "", tags={ "Authentication" })
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Token refreshed", content = @Content(mediaType = "application/json", schema = @Schema(implementation = LoginResponseDTO.class))) })
    @RequestMapping(value = "/auth/refresh-token",
        produces = { "application/json" }, 
        consumes = { "application/json" }, 
        method = RequestMethod.POST)
    ResponseEntity<LoginResponseDTO> authRefreshTokenPost(@Parameter(in = ParameterIn.DEFAULT, description = "", required=true, schema=@Schema()) @Valid @RequestBody AuthRefreshtokenBody body
);


    @Operation(summary = "Register new user", description = "", tags={ "Authentication" })
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "201", description = "User registered", content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserDTO.class))) })
    @RequestMapping(value = "/auth/register",
        produces = { "application/json" }, 
        consumes = { "application/json" }, 
        method = RequestMethod.POST)
    ResponseEntity<UserDTO> authRegisterPost(@Parameter(in = ParameterIn.DEFAULT, description = "", required=true, schema=@Schema()) @Valid @RequestBody RegisterRequest body
);


    @Operation(summary = "Resend email verification", description = "", tags={ "Authentication" })
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Verification email sent", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ResponseDTO.class))),
        
        @ApiResponse(responseCode = "400", description = "Error resending email") })
    @RequestMapping(value = "/auth/resend-verification",
        produces = { "application/json" }, 
        method = RequestMethod.POST)
    ResponseEntity<ResponseDTO> authResendVerificationPost(@NotNull @Parameter(in = ParameterIn.QUERY, description = "" ,required=true,schema=@Schema()) @Valid @RequestParam(value = "email", required = true) String email
);


    @Operation(summary = "Reset password using token", description = "", tags={ "Authentication" })
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Password reset successful", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ResponseDTO.class))),
        
        @ApiResponse(responseCode = "400", description = "Error resetting password") })
    @RequestMapping(value = "/auth/reset-password",
        produces = { "application/json" }, 
        method = RequestMethod.PUT)
    ResponseEntity<ResponseDTO> authResetPasswordPut(@NotNull @Parameter(in = ParameterIn.QUERY, description = "" ,required=true,schema=@Schema()) @Valid @RequestParam(value = "token", required = true) String token
, @NotNull @Parameter(in = ParameterIn.QUERY, description = "" ,required=true,schema=@Schema()) @Valid @RequestParam(value = "newPassword", required = true) String newPassword
);


    @Operation(summary = "Verify email", description = "", tags={ "Authentication" })
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Email verified", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ResponseDTO.class))),
        
        @ApiResponse(responseCode = "400", description = "Verification failed") })
    @RequestMapping(value = "/auth/verify",
        produces = { "application/json" }, 
        method = RequestMethod.PUT)
    ResponseEntity<ResponseDTO> authVerifyPut(@NotNull @Parameter(in = ParameterIn.QUERY, description = "" ,required=true,schema=@Schema()) @Valid @RequestParam(value = "uid", required = true) Integer uid
, @NotNull @Parameter(in = ParameterIn.QUERY, description = "" ,required=true,schema=@Schema()) @Valid @RequestParam(value = "otp", required = true) String otp
);

}


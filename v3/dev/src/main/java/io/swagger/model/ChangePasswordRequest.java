package io.swagger.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;
import org.openapitools.jackson.nullable.JsonNullable;
import io.swagger.configuration.NotUndefined;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * ChangePasswordRequest
 */
@Validated
@NotUndefined
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-05-15T10:20:28.371833724Z[GMT]")


public class ChangePasswordRequest   {
  @JsonProperty("oldPassword")

  private String oldPassword = null;

  @JsonProperty("newPassword")

  private String newPassword = null;


  public ChangePasswordRequest oldPassword(String oldPassword) { 

    this.oldPassword = oldPassword;
    return this;
  }

  /**
   * Get oldPassword
   * @return oldPassword
   **/
  
  @Schema(required = true, description = "")
  
  @NotNull
  public String getOldPassword() {  
    return oldPassword;
  }



  public void setOldPassword(String oldPassword) { 

    this.oldPassword = oldPassword;
  }

  public ChangePasswordRequest newPassword(String newPassword) { 

    this.newPassword = newPassword;
    return this;
  }

  /**
   * Get newPassword
   * @return newPassword
   **/
  
  @Schema(required = true, description = "")
  
  @NotNull
  public String getNewPassword() {  
    return newPassword;
  }



  public void setNewPassword(String newPassword) { 

    this.newPassword = newPassword;
  }

  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ChangePasswordRequest changePasswordRequest = (ChangePasswordRequest) o;
    return Objects.equals(this.oldPassword, changePasswordRequest.oldPassword) &&
        Objects.equals(this.newPassword, changePasswordRequest.newPassword);
  }

  @Override
  public int hashCode() {
    return Objects.hash(oldPassword, newPassword);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ChangePasswordRequest {\n");
    
    sb.append("    oldPassword: ").append(toIndentedString(oldPassword)).append("\n");
    sb.append("    newPassword: ").append(toIndentedString(newPassword)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}

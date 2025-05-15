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
 * ChangeEmailRequest
 */
@Validated
@NotUndefined
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-05-15T10:20:28.371833724Z[GMT]")


public class ChangeEmailRequest   {
  @JsonProperty("newEmail")

  private String newEmail = null;

  @JsonProperty("password")

  private String password = null;


  public ChangeEmailRequest newEmail(String newEmail) { 

    this.newEmail = newEmail;
    return this;
  }

  /**
   * Get newEmail
   * @return newEmail
   **/
  
  @Schema(required = true, description = "")
  
  @NotNull
  public String getNewEmail() {  
    return newEmail;
  }



  public void setNewEmail(String newEmail) { 

    this.newEmail = newEmail;
  }

  public ChangeEmailRequest password(String password) { 

    this.password = password;
    return this;
  }

  /**
   * Get password
   * @return password
   **/
  
  @Schema(required = true, description = "")
  
  @NotNull
  public String getPassword() {  
    return password;
  }



  public void setPassword(String password) { 

    this.password = password;
  }

  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ChangeEmailRequest changeEmailRequest = (ChangeEmailRequest) o;
    return Objects.equals(this.newEmail, changeEmailRequest.newEmail) &&
        Objects.equals(this.password, changeEmailRequest.password);
  }

  @Override
  public int hashCode() {
    return Objects.hash(newEmail, password);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ChangeEmailRequest {\n");
    
    sb.append("    newEmail: ").append(toIndentedString(newEmail)).append("\n");
    sb.append("    password: ").append(toIndentedString(password)).append("\n");
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

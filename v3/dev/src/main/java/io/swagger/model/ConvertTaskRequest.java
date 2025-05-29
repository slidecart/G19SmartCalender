package io.swagger.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import org.threeten.bp.OffsetDateTime;
import org.springframework.validation.annotation.Validated;
import org.openapitools.jackson.nullable.JsonNullable;
import io.swagger.configuration.NotUndefined;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * ConvertTaskRequest
 */
@Validated
@NotUndefined
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-05-15T10:20:28.371833724Z[GMT]")


public class ConvertTaskRequest   {
  @JsonProperty("startDate")

  private OffsetDateTime startDate = null;

  @JsonProperty("endDate")

  private OffsetDateTime endDate = null;


  public ConvertTaskRequest startDate(OffsetDateTime startDate) { 

    this.startDate = startDate;
    return this;
  }

  /**
   * Get startDate
   * @return startDate
   **/
  
  @Schema(required = true, description = "")
  
@Valid
  @NotNull
  public OffsetDateTime getStartDate() {  
    return startDate;
  }



  public void setStartDate(OffsetDateTime startDate) { 

    this.startDate = startDate;
  }

  public ConvertTaskRequest endDate(OffsetDateTime endDate) { 

    this.endDate = endDate;
    return this;
  }

  /**
   * Get endDate
   * @return endDate
   **/
  
  @Schema(required = true, description = "")
  
@Valid
  @NotNull
  public OffsetDateTime getEndDate() {  
    return endDate;
  }



  public void setEndDate(OffsetDateTime endDate) { 

    this.endDate = endDate;
  }

  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ConvertTaskRequest convertTaskRequest = (ConvertTaskRequest) o;
    return Objects.equals(this.startDate, convertTaskRequest.startDate) &&
        Objects.equals(this.endDate, convertTaskRequest.endDate);
  }

  @Override
  public int hashCode() {
    return Objects.hash(startDate, endDate);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ConvertTaskRequest {\n");
    
    sb.append("    startDate: ").append(toIndentedString(startDate)).append("\n");
    sb.append("    endDate: ").append(toIndentedString(endDate)).append("\n");
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

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
 * TaskStatsDTO
 */
@Validated
@NotUndefined
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-05-15T10:20:28.371833724Z[GMT]")


public class TaskStatsDTO   {
  @JsonProperty("total")

  @JsonInclude(JsonInclude.Include.NON_ABSENT)  // Exclude from JSON if absent
  @JsonSetter(nulls = Nulls.FAIL)    // FAIL setting if the value is null
  private Integer total = null;

  @JsonProperty("completed")

  @JsonInclude(JsonInclude.Include.NON_ABSENT)  // Exclude from JSON if absent
  @JsonSetter(nulls = Nulls.FAIL)    // FAIL setting if the value is null
  private Integer completed = null;

  @JsonProperty("pending")

  @JsonInclude(JsonInclude.Include.NON_ABSENT)  // Exclude from JSON if absent
  @JsonSetter(nulls = Nulls.FAIL)    // FAIL setting if the value is null
  private Integer pending = null;


  public TaskStatsDTO total(Integer total) { 

    this.total = total;
    return this;
  }

  /**
   * Get total
   * @return total
   **/
  
  @Schema(description = "")
  
  public Integer getTotal() {  
    return total;
  }



  public void setTotal(Integer total) { 
    this.total = total;
  }

  public TaskStatsDTO completed(Integer completed) { 

    this.completed = completed;
    return this;
  }

  /**
   * Get completed
   * @return completed
   **/
  
  @Schema(description = "")
  
  public Integer getCompleted() {  
    return completed;
  }



  public void setCompleted(Integer completed) { 
    this.completed = completed;
  }

  public TaskStatsDTO pending(Integer pending) { 

    this.pending = pending;
    return this;
  }

  /**
   * Get pending
   * @return pending
   **/
  
  @Schema(description = "")
  
  public Integer getPending() {  
    return pending;
  }



  public void setPending(Integer pending) { 
    this.pending = pending;
  }

  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    TaskStatsDTO taskStatsDTO = (TaskStatsDTO) o;
    return Objects.equals(this.total, taskStatsDTO.total) &&
        Objects.equals(this.completed, taskStatsDTO.completed) &&
        Objects.equals(this.pending, taskStatsDTO.pending);
  }

  @Override
  public int hashCode() {
    return Objects.hash(total, completed, pending);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class TaskStatsDTO {\n");
    
    sb.append("    total: ").append(toIndentedString(total)).append("\n");
    sb.append("    completed: ").append(toIndentedString(completed)).append("\n");
    sb.append("    pending: ").append(toIndentedString(pending)).append("\n");
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

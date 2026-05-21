from datetime import datetime

from pydantic import BaseModel, EmailStr, field_validator, model_validator


class LeadCreate(BaseModel):
    name: str
    email: EmailStr
    company: str | None = None
    project_tier: str | None = None
    message: str

    @field_validator("name")
    @classmethod
    def name_must_not_be_empty(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("name must not be empty")
        if len(v) > 255:
            raise ValueError("name must be 255 characters or fewer")
        return v

    @field_validator("message")
    @classmethod
    def message_must_not_be_empty(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("message must not be empty")
        if len(v) > 5000:
            raise ValueError("message must be 5000 characters or fewer")
        return v

    @model_validator(mode="before")
    @classmethod
    def reject_extra_fields(cls, data):
        """Silently drop any fields not defined in the schema."""
        if isinstance(data, dict):
            allowed = {"name", "email", "company", "project_tier", "message"}
            return {k: v for k, v in data.items() if k in allowed}
        return data


class LeadResponse(BaseModel):
    id: int
    name: str
    email: str
    company: str | None
    project_tier: str | None
    message: str
    timestamp: datetime

    model_config = {"from_attributes": True}

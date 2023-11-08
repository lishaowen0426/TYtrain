package apiresponse

type StatusCode uint8

const (
	Success StatusCode = iota
	EINVPARAM
	ENOTFOUND
	EINTERNAL
	EAUTH
	EDUPLICATED
)

type ApiResponse struct {
	Code   StatusCode             `json:"code"`
	Err    string                 `json:"error,omitempty"`
	Fields map[string]interface{} `json:"fields,omitempty"`
}

func NewSuccess(fields map[string]interface{}) ApiResponse {
	return ApiResponse{Code: Success, Fields: fields}
}

func NewInvParam(err error) ApiResponse {
	return ApiResponse{Code: EINVPARAM, Err: err.Error()}
}

func NewNotFound(err error) ApiResponse {
	return ApiResponse{Code: ENOTFOUND, Err: err.Error()}
}

func NewInternalError(err error) ApiResponse {
	return ApiResponse{Code: EINTERNAL, Err: err.Error()}
}

func NewAuthError(err error) ApiResponse {
	return ApiResponse{Code: EAUTH, Err: err.Error()}
}
func NewDuplicated(err error) ApiResponse {
	return ApiResponse{Code: EDUPLICATED, Err: err.Error()}
}

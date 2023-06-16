export enum SystemMessage {
    ActionSuccessfully = '{0} thành công.',
    ActionUnsuccessfully = '{0} không thành công.',
    ObjectRequirement = '{0} yêu cầu nhập.',
    ObjectNotMacth = '{0} không giống.',
    ObjectIncorrect = '{0} không đúng.',
    GeneralExceptionMessageText =
    // tslint:disable-next-line: max-line-length
    'Có một ngoại lệ không mong muốn đã xảy ra trong hệ thống, vui lòng liên hệ với quản trị viên hệ thống của bạn và chuyển thông tin có trong thông báo này.',
    UnAuthorizedMessage = 'Bạn không được quyền thực hiện trên chức năng này.',
    Error404 = '404: Xin lỗi chúng tôi không thể tìm thấy trang này.',
    ErrorLogin = 'Tên đăng nhập hoặc mật khẩu không đúng.',
    LoginRequired = 'Tên đăng nhập và Mật khẩu yêu cầu nhập.',
    InvalidFiles = 'File không đúng. Bạn hãy xem lại yêu cầu chổ này.',
    InvalidPassCode = 'Mã code nhập chưa đủ 6 số.',
    ResendPassCodeTime = 'Bạn phải đợi đủ 5 phút mới gửi lại.',
    InvalidFileExtension = 'Loại file này không được phép tải lên. Những loại được phép tải lên {0}.',
    InvalidMaxFileSize = 'Kích thước file quá lớn. Kích thước file không được lớn hơn {0}MB.',
    InvalidMinFileSize = 'Kích thước file quá nhỏ. Kích thước file phải lớn hơn {0}MB.',
    MessConfirm = 'Bạn có chắc chắn muốn {0} dữ liệu này không?',
    MessComfirmChildrenLyDoTiepNhan = 'Bạn có chắc chắn muốn {0} {1} này không? (Nếu có thì tất cả {1} con của {1} này cũng xóa theo)',
    MessLockAccount = 'Bạn có chắc muốn {0} tài khoản này không?',
    MessLockTemplate = 'Bạn có chắc muốn {0} {1} này không?',
    MessLockCalendar = 'Bạn có chắc muốn {0} {1} hay không?',
    ObjectRequirementUpdate = 'Yêu cầu nhập số điện thoại hoặc email'
}

import ROUTER from "src/router"
import SvgIcon from "../SvgIcon"
const MenuItemBreadcrumb = () => {
  return [
    {
      label: "Đăng nhập",
      key: ROUTER?.DANG_NHAP,
    },
    {
      label: "Đăng ký",
      key: ROUTER?.DANG_KY,
    },
    {
      label: "Đổi mật khẩu",
      key: ROUTER?.DOI_MAT_KHAU,
    },
    {
      label: "Hỏi đáp",
      key: ROUTER?.QUESTION,
    },
    {
      label: "Hỗ trợ",
      key: ROUTER?.HO_TRO,
    },
    {
      label: "Tra cứu kết quả",
      key: ROUTER?.TRA_CUU_KET_QUA,
    },
    {
      label: "Thủ tục hành chính",
      key: ROUTER?.THU_TUC_HANH_CHINH,
    },
    {
      label: "Thủ tục đăng ký sáng chế",
      key: ROUTER?.HUONG_DAN_DANG_KY_SANG_CHE,
    },
  ]
}

export default MenuItemBreadcrumb

export const MenuItemAdmin = () => {
  return [
    {
      label: "Quản lý hồ sơ",
      key: "subkey2",
      icon: <SvgIcon name="document" />,
      TabID: [9, 10, 11, 12, 13],
      children: [
        {
          label: "Tiếp nhận Trực Tuyến",
          key: ROUTER.HO_SO_TRUC_TUYEN,
          TabID: [9],
        },
        {
          label: "Tiếp nhận đơn Giấy",
          key: ROUTER.HO_SO_TRUC_TIEP,
          TabID: [10],
        },
        {
          label: "Ký tiếp nhận",
          key: ROUTER.KY_TRA_KET_QUA,
          TabID: [11],
        },
        // {
        //   label: "Ký trả văn bằng",
        //   key: ROUTER.KY_TRA_VAN_BANG,
        //   TabID: [11],
        // },
        {
          label: "Thu phí đơn Trực Tuyến",
          key: ROUTER.HO_SO_TRUC_TUYEN_THU_PHI,
          TabID: [12],
        },
        {
          label: "Thu phí đơn Giấy",
          key: ROUTER.HO_SO_TRUC_TIEP_THU_PHI,
          TabID: [13],
        },
      ],
    },
    // {
    //   label: "Danh sách hồ sơ IT",
    //   key: ROUTER.XEM_DS_HS_IT,
    //   icon: <SvgIcon name="file-text" />,
    //   TabID: [15],
    // },
    // {
    //   label: "Quản lý quỹ",
    //   key: ROUTER.QUAN_LY_QUY,
    //   icon: <SvgIcon name="coin" />,
    //   TabID: [35],
    // },
    {
      label: "Quản lý số dư",
      key: ROUTER.QUAN_LY_SO_DU,
      icon: <SvgIcon name="coin" />,
      TabID: [35],
    },
    {
      label: "Xử lý yêu cầu hỗ trợ",
      key: ROUTER.YEU_CAU_HO_TRO,
      icon: <SvgIcon name="headphone" />,
      TabID: [14],
    },
    {
      label: "Duyệt đăng ký",
      key: ROUTER.DUYET_DANG_KY,
      icon: <SvgIcon name="menu-authori" />,
      TabID: [15],
    },
    {
      label: "Yêu cầu cập nhật",
      key: ROUTER.YEU_CAU_CAP_NHAT,
      icon: <SvgIcon name="user-info-change" />,
      TabID: [32],
    },
    {
      key: ROUTER.DANH_BA_TO_CHUC_DAI_DIEN,
      label: "Quản lý tổ chức đại diện",
      icon: <SvgIcon name="user-organ" />,
      TabID: [34],
    },
    {
      key: ROUTER.DANH_BA_NGUOI_DAI_DIEN,
      label: "Quản lý chứng chỉ",
      icon: <SvgIcon name="user-representative" />,
      TabID: [33],
    },
    {
      key: ROUTER.DANH_BA_KHACH_HANG,
      label: "Danh bạ khách hàng",
      icon: <SvgIcon name="user-single" />,
      TabID: [16],
    },

    {
      label: "Quản trị hệ thống",
      key: "subkey1",
      icon: <SvgIcon name="management-skdn" />,
      TabID: [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
      children: [
        {
          key: ROUTER.DANH_BA_NHAN_VIEN,
          label: "Danh bạ nhân viên",
          TabID: [17],
        },
        {
          key: ROUTER.DANH_SACH_CHUC_VU,
          label: "Danh sách chức vụ",
          TabID: [18],
        },
        {
          key: ROUTER.DANH_MUC_HE_THONG,
          label: "Danh mục hệ thống",
          TabID: [19, 20, 21, 22, 23, 24, 25, 26],
        },
        {
          key: ROUTER.DANH_MUC_HO_SO,
          label: "Danh mục hồ sơ",
          TabID: [27],
        },
        {
          key: ROUTER.QUAN_LY_PHAN_QUYEN,
          label: "Phân quyền",
          TabID: [28],
        },
        {
          key: ROUTER.NHAT_KY_HE_THONG,
          label: "Nhật ký hệ thống",
          TabID: [29],
        },
      ],
    },
  ]
}

export const MenuItemUser = () => {
  return [
    // {
    //   key: ROUTER.HOME,
    //   label: "Trang chủ",
    //   icon: <SvgIcon name="home" />,
    //   TabID: [],
    // },
    {
      label: "Hồ sơ của tôi",
      key: "subkey1",
      icon: <SvgIcon name="document" />,
      TabID: [2, 3],
      children: [
        {
          label: "Chờ xử lý",
          key: ROUTER.HO_SO_CHO_XU_LY,
          TabID: [2],
        },
        // {
        //   label: "Nhóm thanh toán",
        //   key: ROUTER.NHOM_THANH_TOAN,
        //   TabID: [3],
        // },
        {
          label: "Đang xử lý",
          key: ROUTER.HO_SO_DANG_XU_LY,
          TabID: [3],
        },
        // {
        //   label: "Danh sách văn bằng",
        //   key: ROUTER.DANH_SACH_VAN_BANG,
        //   TabID: [3],
        // },
      ],
    },
    {
      label: "Yêu cầu hỗ trợ",
      key: ROUTER.DANH_SACH_YEU_CAU_HO_TRO,
      icon: <SvgIcon name="headphone" />,
      TabID: [4],
    },
    {
      key: ROUTER.LS_HOAT_DONG_USER,
      label: "Lịch sử hoạt động",
      icon: <SvgIcon name="history-company" />,
      TabID: [5],
    },
    {
      key: ROUTER.DANH_BA_NGUOI_DAI_DIEN_DV,
      label: "Danh bạ người đại diện",
      icon: <SvgIcon name="management-skdn" />,
      TabID: [6],
    },
    {
      key: ROUTER.THONG_TIN_TAI_KHOAN,
      label: "Thông tin cá nhân",
      icon: <SvgIcon name="user-info" />,
      TabID: [7],
    },
    {
      key: ROUTER.CAU_HINH_CHU_KY,
      label: "Cấu hình chữ ký",
      icon: <SvgIcon name="config" />,
      TabID: [8],
    },
  ]
}

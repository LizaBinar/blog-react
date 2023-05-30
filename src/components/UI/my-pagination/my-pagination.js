import { ConfigProvider, Pagination } from "antd";
import PropTypes from "prop-types";

const style = {
  colorBgContainer: "#1677ff",
  colorPrimary: "#e7eaf1",
  colorPrimaryHover: "#b7b7ff",
};

const MyPagination = ({ onChange, paginationCount, current }) => {
  return (
    <ConfigProvider theme={{ components: { Pagination: style } }}>
      <Pagination
        style={style}
        current={current}
        total={paginationCount}
        defaultPageSize={5}
        onChange={(el) => onChange(el)}
      />
    </ConfigProvider>
  );
};

MyPagination.propTypes = {
  onChange: PropTypes.func,
  paginationCount: PropTypes.number,
  current: PropTypes.number,
};

export default MyPagination;

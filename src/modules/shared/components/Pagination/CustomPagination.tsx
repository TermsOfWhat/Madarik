import { Pagination, PaginationProps } from 'antd'

import arrowLeft from '../../../accounting/assets/icons/arrow-left.svg'
import arrowRight from '../../../accounting/assets/icons/arrow-right.svg'

type paginationProps = {
  handlePageSizeChange: (pageSize: number) => void
  handlePageChange: (page: number, pageSize: number) => void
  onShowSizeChange: (current: number, size: number) => void
  pageSize: number
  currentPage: number
  total: number
  displayedPages?: number[]
  disabled?: boolean
}

const CustomPagination = ({
  disabled,
  handlePageSizeChange,
  handlePageChange,
  onShowSizeChange,
  pageSize,
  currentPage,
  total,
  displayedPages = [25, 50, 75],
}: paginationProps) => {
  const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return <img src={arrowLeft} />
    }
    if (type === 'next') {
      return <img src={arrowRight} />
    }
    return originalElement
  }

  return (
    <div className={`pagination-container ${disabled ? 'disabled' : ''}`}>
      <div className="pagination-elements">
        <div className="pages">
          {displayedPages.map((size) => (
            <div
              onClick={() => {
                if (!disabled) {
                  handlePageSizeChange(size)
                }
              }}
              key={size}
              className={`page ${pageSize === size ? 'active' : ''}`}
            >
              {size}
            </div>
          ))}
        </div>
        <p>éléments par page</p>
      </div>
      <Pagination
        disabled={disabled}
        itemRender={itemRender}
        showSizeChanger={false}
        onChange={handlePageChange}
        defaultCurrent={2}
        total={total}
        locale={{
          jump_to: 'Allez vers page',
          page: '',
        }}
        current={currentPage}
        showQuickJumper
        pageSize={pageSize}
        onShowSizeChange={onShowSizeChange}
      />
    </div>
  )
}

export default CustomPagination

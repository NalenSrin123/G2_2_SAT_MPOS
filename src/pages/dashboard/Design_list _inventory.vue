<script setup>
const iconStroke = 'h-[18px] w-[18px] fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]'
const smallIconStroke = 'h-[17px] w-[17px] fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]'
const tableHeadClass = 'border-b border-[#f0f2f5] px-3 py-3 text-left text-[9px] font-semibold leading-tight tracking-[1.5px] text-[#777d8c] md:px-4 md:py-4 md:text-[10px] md:tracking-[3px] xl:px-5'
const tableCellClass = 'border-b border-[#f0f2f5] px-3 py-3 align-middle text-xs text-[#3f4653] md:px-4 md:py-4 md:text-sm xl:px-5'
import * as XLSX from "xlsx";
const exportExcel = () => {
  const data = items.map(item => ({
    'Item Name': item.name,
    'SKU': item.sku,
    'Category': item.category,
    'Current Stock': item.stock,
    'Unit': item.unit,
    'Last Restocked': item.restocked,
    'Status': item.status,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");
  XLSX.writeFile(workbook, "inventory_data.xlsx");
}
const stats = [
  {
    label: 'TOTAL SKU VALUE',
    value: '$1,482,920.00',
    note: '+4.2% from last month',
    noteClass: 'text-green-600 font-bold',
    auraClass: 'bg-[#eaf2ff]',
    iconClass: 'bg-[#ddecff] text-[#0056bc]',
    icon: 'money',
  },
  {
    label: 'LOW STOCK ALERTS',
    value: '18 Items',
    note: 'Requires immediate action',
    noteClass: 'text-[#cf1111] font-bold',
    auraClass: 'bg-[#fff0f0]',
    iconClass: 'bg-[#ffe1e1] text-[#e03131]',
    icon: 'warning',
  },
  {
    label: 'RECENT RESTOCKS',
    value: '242 Units',
    note: 'Last delivery: 4 hours ago',
    noteClass: 'text-[#7a8496] font-medium',
    auraClass: 'bg-[#e5fbff]',
    iconClass: 'bg-[#177e8c] text-white',
    icon: 'truck',
  },
]

const items = [
  {
    name: 'Precision Laser Scanner X-10',
    sku: 'NX-4902-1',
    category: 'HARDWARE',
    stock: 14,
    unit: 'Units',
    restocked: 'Oct 24, 2023',
    status: 'Low Stock',
    statusClass: 'border border-[#ffd7d7] bg-[#fff1f1] text-[#d11111]',
    icon: 'scanner',
  },
  {
    name: 'Nexus Connector Cable 3m',
    sku: 'NX-1283-A',
    category: 'ACCESSORIES',
    stock: 542,
    unit: 'Meters',
    restocked: 'Nov 02, 2023',
    status: 'Optimal',
    statusClass: 'bg-[#dff8e9] text-[#14994c]',
    icon: 'cable',
  },
  {
    name: 'POS Terminal Mount V3',
    sku: 'NX-9981-M',
    category: 'FURNITURE',
    stock: 3,
    unit: 'Units',
    restocked: 'Sep 15, 2023',
    status: 'Critical',
    statusClass: 'border border-[#ffd7d7] bg-[#fff1f1] text-[#d11111]',
    icon: 'terminal',
  },
  {
    name: 'ARM Processor Core-X',
    sku: 'NX-CPU-82',
    category: 'HARDWARE',
    stock: 128,
    unit: 'Units',
    restocked: 'Nov 10, 2023',
    status: 'Optimal',
    statusClass: 'bg-[#dff8e9] text-[#14994c]',
    icon: 'chip',
  },
]
</script>

<template>
    <main class="min-h-screen bg-[#f7f8fb] px-4 py-5 text-[#22252c] sm:px-7 sm:py-6.5">
      <section class="mb-7 flex flex-col items-start justify-between gap-5 min-[821px]:flex-row min-[821px]:items-center">
        <div>
          <h1 class="mb-2 text-[25px] font-bold leading-[1.1]">Inventory Management</h1>
          <p class="m-0 text-sm text-[#667085]">Real-time tracking of warehouse assets and stock levels.</p>
        </div>

        <div class="grid w-full grid-cols-1 gap-3 min-[560px]:grid-cols-2 min-[821px]:flex min-[821px]:w-auto min-[821px]:items-center min-[821px]:gap-2.5">
          <button
            class="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap rounded-md border-0 bg-[#e8ebf0] px-4 text-sm font-bold text-[#00449e] transition duration-200 hover:-translate-y-px min-[821px]:h-11 min-[821px]:w-auto min-[821px]:px-4.5"
            type="button"
          >
            <svg class="h-5 w-5 flex-none fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3v10m0 0 4-4m-4 4-4-4" />
              <path d="M5 17v3h14v-3" />
            </svg>
            <path @click="exportExcel" >Export CSV</path>
          </button>
          <button
            class="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap rounded-md border-0 bg-[#00449e] px-4 text-sm font-bold text-white shadow-[0_8px_18px_rgba(0,68,158,0.24)] transition duration-200 hover:-translate-y-px min-[821px]:h-11 min-[821px]:w-auto min-[821px]:px-4.5"
            type="button"
          >
            <svg class="h-5 w-5 flex-none fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span>Restock Items</span>
          </button>
        </div>
      </section>

      <section class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-6" aria-label="Inventory summary">
        <article
          v-for="stat in stats"
          :key="stat.label"
          class="relative flex min-h-29.5 origin-center justify-between overflow-hidden rounded-lg border border-[#eef1f5] bg-white px-4 py-5 shadow-[0_10px_24px_rgba(20,28,45,0.04)] transition-transform duration-200 hover:scale-[1.02] sm:min-h-[126px] sm:px-3 sm:py-5 md:px-4 lg:min-h-[132px] lg:px-[22px] lg:py-6"
        >
          <div
            class="absolute -right-12 -top-22 h-37.5 w-37.5 rounded-full opacity-55 lg:-right-10.5 lg:-top-21 lg:h-42.5 lg:w-42.5"
            :class="stat.auraClass"
            aria-hidden="true"
          ></div>
          <div class="relative z-10 grid gap-2.5 lg:gap-3">
            <span class="text-[9px] font-semibold tracking-[2px] text-[#777d8c] md:text-[10px] lg:text-[11px] lg:tracking-[3px]">{{ stat.label }}</span>
            <strong class="text-[20px] font-bold leading-none text-[#1f2228] md:text-[23px] lg:text-[28px]">{{ stat.value }}</strong>
            <em class="text-[11px] not-italic md:text-xs lg:text-sm" :class="stat.noteClass">{{ stat.note }}</em>
          </div>
          <div
            class="relative z-10 flex h-7 w-7 flex-none items-center justify-center rounded-[7px] md:h-8 md:w-8 lg:h-8.5 lg:w-8.5"
            :class="stat.iconClass"
            aria-hidden="true"
          >
            <svg v-if="stat.icon === 'money'" class="h-5 w-5 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]" viewBox="0 0 24 24">
              <path d="M4 7h16v12H4z" />
              <path d="M8 11h7m-7 4h4" />
              <path d="M17 7V5H6" />
            </svg>
            <svg v-else-if="stat.icon === 'warning'" class="h-5 w-5 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]" viewBox="0 0 24 24">
              <path d="m12 4 9 16H3z" />
              <path d="M12 9v5m0 3h.01" />
            </svg>
            <svg v-else class="h-5 w-5 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]" viewBox="0 0 24 24">
              <path d="M3 7h11v10H3z" />
              <path d="M14 11h3l3 3v3h-6z" />
              <circle cx="7" cy="18" r="1.8" />
              <circle cx="17" cy="18" r="1.8" />
            </svg>
          </div>
        </article>
      </section>

      <section class="overflow-hidden rounded-lg border border-[#edf0f4] bg-white shadow-[0_12px_28px_rgba(17,24,39,0.04)]">
        <div class="flex min-h-18 flex-col items-start justify-between gap-3.5 border-b border-[#eef1f5] p-4.5 min-[821px]:flex-row min-[821px]:items-center min-[821px]:gap-0 min-[821px]:px-[22px] min-[821px]:py-0">
          <nav class="flex max-w-full gap-4.5 overflow-x-auto min-[821px]:h-full min-[821px]:gap-6.5" aria-label="Inventory views">
            <button class="relative cursor-pointer whitespace-nowrap border-0 bg-transparent pb-3 text-sm font-bold text-[#00449e] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-[#00449e] min-[821px]:px-0 min-[821px]:pb-5 min-[821px]:pt-[26px]" type="button">
              All Items (1,240)
            </button>
            <button class="cursor-pointer whitespace-nowrap border-0 bg-transparent pb-3 text-sm font-medium text-[#475467] min-[821px]:px-0 min-[821px]:pb-5 min-[821px]:pt-[26px]" type="button">
              Critical Stock
            </button>
            <button class="cursor-pointer whitespace-nowrap border-0 bg-transparent pb-3 text-sm font-medium text-[#475467] min-[821px]:px-0 min-[821px]:pb-5 min-[821px]:pt-[26px]" type="button">
              Archived
            </button>
          </nav>
          <div class="flex items-center gap-4">
            <button class="grid h-8 w-8 cursor-pointer place-items-center border-0 bg-transparent text-[#6f7684]" type="button" aria-label="Filter inventory">
              <svg :class="iconStroke" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 6h16M8 12h8M10 18h4" />
              </svg>
            </button>
            <button class="grid h-8 w-8 cursor-pointer place-items-center border-0 bg-transparent text-[#6f7684]" type="button" aria-label="Sort inventory">
              <svg :class="iconStroke" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 7h14M5 12h10M5 17h6" />
              </svg>
            </button>
          </div>
        </div>

        <div class="grid gap-3 p-4 md:hidden">
          <article
            v-for="item in items"
            :key="`mobile-${item.sku}`"
            class="rounded-lg border border-[#edf0f4] bg-white p-4 shadow-[0_8px_18px_rgba(17,24,39,0.04)]"
          >
            <div class="mb-4 flex items-start justify-between gap-3">
              <div class="flex items-center gap-3">
                <span class="inline-flex h-8 w-8 flex-none items-center justify-center rounded-[7px] bg-[#eaf2ff] text-[#00449e]" aria-hidden="true">
                  <svg v-if="item.icon === 'scanner'" :class="smallIconStroke" viewBox="0 0 24 24">
                    <path d="M8 4h8v3H8z" />
                    <path d="M6 7h12v14H6z" />
                    <path d="M9 12h6m-3-3v6" />
                  </svg>
                  <svg v-else-if="item.icon === 'cable'" :class="smallIconStroke" viewBox="0 0 24 24">
                    <path d="M8 6v12m8-12v12" />
                    <path d="M5 9h6v6H5zm8 0h6v6h-6z" />
                  </svg>
                  <svg v-else-if="item.icon === 'terminal'" :class="smallIconStroke" viewBox="0 0 24 24">
                    <path d="M4 5h16v12H4z" />
                    <path d="M8 20h8" />
                  </svg>
                  <svg v-else :class="smallIconStroke" viewBox="0 0 24 24">
                    <path d="M8 8h8v8H8z" />
                    <path d="M4 10h4m8 0h4M4 14h4m8 0h4M10 4v4m4-4v4m-4 8v4m4-4v4" />
                  </svg>
                </span>
                <div>
                  <h3 class="text-sm font-bold leading-tight text-[#22252c]">{{ item.name }}</h3>
                  <p class="mt-1 text-xs text-[#667085]">{{ item.sku }}</p>
                </div>
              </div>
              <span class="inline-flex whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-bold leading-none" :class="item.statusClass">
                {{ item.status }}
              </span>
            </div>

            <dl class="grid grid-cols-2 gap-3 text-xs">
              <div>
                <dt class="mb-1 font-semibold tracking-[1px] text-[#777d8c]">CATEGORY</dt>
                <dd class="m-0">
                  <span class="inline-flex rounded-full bg-[#ebedf1] px-2 py-1 text-[10px] font-bold leading-none text-[#344563]">
                    {{ item.category }}
                  </span>
                </dd>
              </div>
              <div>
                <dt class="mb-1 font-semibold tracking-[1px] text-[#777d8c]">STOCK</dt>
                <dd class="m-0 font-bold text-[#22252c]">{{ item.stock }} {{ item.unit }}</dd>
              </div>
              <div class="col-span-2">
                <dt class="mb-1 font-semibold tracking-[1px] text-[#777d8c]">LAST RESTOCKED</dt>
                <dd class="m-0 text-[#3f4653]">{{ item.restocked }}</dd>
              </div>
            </dl>
          </article>
        </div>

        <div class="hidden w-full overflow-x-auto [scrollbar-width:thin] md:block">
          <table class="w-full min-w-170 table-fixed border-collapse md:min-w-full">
            <colgroup>
              <col class="w-[29%]" />
              <col class="w-[14%]" />
              <col class="w-[15%]" />
              <col class="w-[12%]" />
              <col class="w-[10%]" />
              <col class="w-[13%]" />
              <col class="w-[11%]" />
            </colgroup>
            <thead>
              <tr>
                <th :class="tableHeadClass">ITEM NAME</th>
                <th :class="tableHeadClass">SKU</th>
                <th :class="tableHeadClass">CATEGORY</th>
                <th :class="tableHeadClass">CURRENT STOCK</th>
                <th :class="tableHeadClass">UNIT</th>
                <th :class="tableHeadClass">LAST RESTOCKED</th>
                <th :class="tableHeadClass">STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.sku">
                <td :class="tableCellClass">
                  <div class="flex items-center gap-2 md:gap-3">
                    <span class="inline-flex h-6 w-6 flex-none items-center justify-center rounded-[7px] bg-[#eaf2ff] text-[#00449e] md:h-7 md:w-7" aria-hidden="true">
                      <svg v-if="item.icon === 'scanner'" :class="smallIconStroke" viewBox="0 0 24 24">
                        <path d="M8 4h8v3H8z" />
                        <path d="M6 7h12v14H6z" />
                        <path d="M9 12h6m-3-3v6" />
                      </svg>
                      <svg v-else-if="item.icon === 'cable'" :class="smallIconStroke" viewBox="0 0 24 24">
                        <path d="M8 6v12m8-12v12" />
                        <path d="M5 9h6v6H5zm8 0h6v6h-6z" />
                      </svg>
                      <svg v-else-if="item.icon === 'terminal'" :class="smallIconStroke" viewBox="0 0 24 24">
                        <path d="M4 5h16v12H4z" />
                        <path d="M8 20h8" />
                      </svg>
                      <svg v-else :class="smallIconStroke" viewBox="0 0 24 24">
                        <path d="M8 8h8v8H8z" />
                        <path d="M4 10h4m8 0h4M4 14h4m8 0h4M10 4v4m4-4v4m-4 8v4m4-4v4" />
                      </svg>
                    </span>
                    <strong class="block max-w-[150px] text-xs font-bold leading-[1.15] text-[#22252c] md:max-w-[190px] md:text-sm">{{ item.name }}</strong>
                  </div>
                </td>
                <td :class="tableCellClass">{{ item.sku }}</td>
                <td :class="tableCellClass">
                  <span class="inline-flex whitespace-nowrap rounded-full bg-[#ebedf1] px-2 py-1 text-[10px] font-bold leading-none text-[#344563] md:px-3 md:py-1.5 md:text-[11px]">
                    {{ item.category }}
                  </span>
                </td>
                <td class="border-b border-[#f0f2f5] px-3 py-3 text-center align-middle text-xs font-bold text-[#22252c] md:px-4 md:py-4 md:text-sm xl:px-5">{{ item.stock }}</td>
                <td :class="tableCellClass">{{ item.unit }}</td>
                <td :class="tableCellClass">{{ item.restocked }}</td>
                <td :class="tableCellClass">
                  <span class="inline-flex whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-bold leading-none md:px-3 md:py-1.5 md:text-[11px]" :class="item.statusClass">
                    {{ item.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <footer class="flex flex-col items-start justify-between gap-3.5 px-5.5 py-[18px] min-[821px]:flex-row min-[821px]:items-center">
          <p class="m-0 text-sm text-[#4f5663]">Showing 1 to 10 of 1,240 entries</p>
          <div class="flex items-center gap-2" aria-label="Pagination">
            <button class="grid h-9 min-w-9 cursor-pointer place-items-center rounded-md border border-[#e1e5ec] bg-transparent text-sm text-[#6f7684]" type="button" aria-label="Previous page">
              <svg :class="iconStroke" viewBox="0 0 24 24" aria-hidden="true">
                <path d="m14 7-5 5 5 5" />
              </svg>
            </button>
            <button class="grid h-9 min-w-9 cursor-pointer place-items-center rounded-md border-0 bg-[#00449e] text-sm font-bold text-white" type="button">1</button>
            <button class="grid h-9 min-w-9 cursor-pointer place-items-center rounded-md border-0 bg-transparent text-sm text-[#475467]" type="button">2</button>
            <button class="grid h-9 min-w-9 cursor-pointer place-items-center rounded-md border-0 bg-transparent text-sm text-[#475467]" type="button">3</button>
            <button class="grid h-9 min-w-9 cursor-pointer place-items-center rounded-md border border-[#e1e5ec] bg-transparent text-sm text-[#6f7684]" type="button" aria-label="Next page">
              <svg :class="iconStroke" viewBox="0 0 24 24" aria-hidden="true">
                <path d="m10 7 5 5-5 5" />
              </svg>
            </button>
          </div>
        </footer>
      </section>
    </main>

</template>

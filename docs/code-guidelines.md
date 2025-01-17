## **1. 檔案與資料夾結構規範**

### **1.1 Composables 規範**
主要是盡量先避免在單個檔案過度攏長，變數與函數可能跨度過大，之間又參雜著各種無關邏輯，變數就難找，unused 也難觀察到。
#### 規則：
1. **凡與變數（ref,props 等）有讀寫關係的函數必須包成 Composable**。
2. **通用邏輯獨立為全域 Composable**（例如 `useCount`）。
3. **專屬邏輯放在元件資料夾中，避免全域污染**。

#### 資料夾結構：
```plaintext
composables/
├── useFetchData.ts   # 通用的數據拉取邏輯
├── useAuth.ts        # 登入與驗證邏輯
├── form/
│   ├── useFormValidation.ts  # 表單驗證邏輯
│   └── useFormData.ts        # 表單狀態管理
```

#### 命名規則：
- **檔案名**：小駝峰式命名，前綴為 `use`，例如：`useCounter.ts`、`useFetch.ts`。
- **子資料夾**：小駝峰式命名，分主題歸類，如 `form/`、`auth/`。
- **函數名**：和檔案名一致。
- **props**：當使用 `defineProps` 定義時，應在 Composable 中定義接口。

#### 使用範例 1：
```typescript
// composables/useCounter.ts
export function useCounter() {
  const count = ref(0);
  const increment = () => count.value++;
  const decrement = () => count.value--;

  return { count, increment, decrement };
}
```
#### 使用範例 2 (Props)：
```typescript
// composables/useCounter.ts
export function useCounter(props : {count: number}) {
  const count = toRefs(props).count;
  const doubledCount = computed(() => count.value * 2);
  const increment = () => {
    count.value++;
  };

  return {
    count,
    doubledCount,
    increment
  };
}
```
---

### **1.2 Components 規範**
#### 規則：
1. **組件名稱必須與檔案名一致，使用 PascalCase 命名**。
2. **每個組件專屬的邏輯（如 `useCounterLogic`）應放在元件的資料夾內**。
3. **將大型功能模組拆分為子元件放入資料夾**。

#### 資料夾結構：
```plaintext
components/
├── Card/
│   ├── Title.vue
│   ├── index.vue
├── Header.vue       # 單檔案元件
```

#### 命名規則：
- **檔案名**：PascalCase，例：`Button.vue`。
- **資料夾名**：PascalCase，例：`Card/`。
可以從 Nuxt Auto Import 的名稱，記得 PascalCase 的命名方式，`<CardTitle />` 會自動導入 `CardTitle.vue`，<Card/> 會自動導入 `Card/index.vue`。

---

### **1.3 Pages 規範**
#### 規則：
1. **檔案名全小寫，有分段則用`-`號表示**。
2. **動態路由使用 `[]` 包裹變數名**。

#### 資料夾結構：
```plaintext
pages/
├── index.vue         # 首頁
├── about.vue         # 關於頁面
├── [slug].vue        # 動態路由
├── auth/
│   ├── login.vue     # 登入頁
│   └── register.vue  # 註冊頁
```

#### 命名規則：
- **檔案名**：小寫加連字號，例：`about.vue`。
- **動態路由**：使用 `[變數名]`，例：`[id].vue`。

---

## **2. 命名規範**

### **2.1 變數命名**
1. **小駝峰式命名**：
   - 範例：`userData`、`isLoading`、`fetchCount`。
2. **避免縮寫，確保語義清晰**：
   - 不推薦：`cnt`（應為 `count`）、`usr`（應為 `user`）。

### **2.2 常數命名**
1. **全大寫，下劃線分隔**：
   - 範例：`API_BASE_URL`、`DEFAULT_TIMEOUT`。

### **2.3 接口與類型命名**
1. **接口前加 `I`，使用 PascalCase**：
   - 範例：`IUser`、`IFormData`。
2. **類型使用 PascalCase**：
   - 範例：`User`、`FormData`。

---

## **3. 註解規範**

### **3.1 文件頂部註解**
```typescript
/**
 * useCounter.ts
 * @description 計數器的 Composable，包含增減功能
 * @author John
 * @date 2025-01-10
 */
```

### **3.2 函數註解**
```typescript
/**
 * 增加計數
 * @param amount - 要增加的數量
 */
const increment = (amount: number) => {
  count.value += amount;
};
```

### **3.3 註解格式**
- 單行註解：
  ```typescript
  // 初始化變數
  const count = ref(0);
  ```
- 多行註解：
  ```typescript
  /**
   * 更新使用者資料
   * @param id - 使用者 ID
   * @param data - 要更新的資料
   */
  const updateUser = async (id: string, data: IUser) => { ... };
  ```

---

## **4. Typescript 使用規範**

### **4.1 開啟嚴格模式**
在 `tsconfig.json` 中：
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### **4.2 預定義類型**
- **定義全域類型**：在 `types/` 資料夾內存放。
  ```plaintext
  types/
  ├── user.ts
  ├── auth.ts
  ```

- 範例：
  ```typescript
  // types/user.ts
  export interface IUser {
    id: string;
    name: string;
    email: string;
  }
  ```

### **4.3 Prop 定義**
在元件中使用 `defineProps` 時，必須明確類型：
```typescript
<script setup lang="ts">
interface Props {
  title: string;
  count?: number;
}

defineProps<Props>();
</script>
```

---

## **5. 代碼風格規範**

### **5.1 格式化工具**
- 使用 **Prettier** 和 **ESLint**，配置 `.prettierrc`：
  ```json
  {
    "semi": true,
    "singleQuote": true,
    "trailingComma": "es5"
  }
  ```

### **5.2 引號**
- 統一使用單引號 `'`。

### **5.3 Tab 與縮進**
- 使用 **2 空格** 縮排。

---

## **6. 版本管理規範**

### **6.1 分支命名**
- **功能分支**：`feature/功能描述`
- **修復分支**：`fix/問題描述`
- **發布分支**：`release/版本號`

### **6.2 Commit 規範**
- **Commit Message 格式**：`<類型>(範圍): 信息`
- **類型**：`feat`（新功能）、`fix`（修復）、`docs`（文檔）、`style`（格式）、`refactor`（重構）、`test`（測試）、`chore`（其他）

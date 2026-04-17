'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { OrgDepartmentKey } from './org-legend'

const OrgDepartmentContext = createContext<OrgDepartmentKey | undefined>(undefined)

export function OrgDepartmentProvider({
  value,
  children,
}: {
  value: OrgDepartmentKey
  children: ReactNode
}) {
  return <OrgDepartmentContext.Provider value={value}>{children}</OrgDepartmentContext.Provider>
}

export function useOrgDepartment() {
  return useContext(OrgDepartmentContext)
}

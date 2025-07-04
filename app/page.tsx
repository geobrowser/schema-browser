"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import schemaData from "@/data/schema.json";
import { Badge, Search } from "lucide-react";
import { useMemo, useState } from "react";

interface SchemaEntry {
  id: string;
  name: string;
  className: string;
  properties: Array<{
    id: string;
    dataType: string;
    relationValueTypes: any[];
    entity: {
      id: string;
      name: string;
    };
  }>;
  schema: string;
  mapping: string;
}

export default function SchemaViewer() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEntries = useMemo(() => {
    if (!searchTerm.trim()) {
      return schemaData as SchemaEntry[];
    }

    const searchLower = searchTerm.toLowerCase();
    return (schemaData as SchemaEntry[]).filter(
      (entry) =>
        entry.name.toLowerCase().includes(searchLower) ||
        entry.className.toLowerCase().includes(searchLower)
    );
  }, [searchTerm]);

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Schema Browser</h1>
        <p className="text-muted-foreground mb-6">
          Browse and search through {schemaData.length} schema entries
        </p>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by name or class name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="mb-4">
        <Badge variant="secondary">
          {filteredEntries.length} of {schemaData.length} entries
        </Badge>
      </div>

      <div className="grid gap-6">
        {filteredEntries.map((entry) => (
          <Card key={entry.id} className="w-full">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{entry.name}</CardTitle>
                  <CardDescription className="mt-1">
                    <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                      {entry.className}
                    </span>
                  </CardDescription>
                </div>
                <Badge variant="outline" className="font-mono text-xs">
                  {entry.id}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Properties Summary */}
              <div>
                <h4 className="font-semibold mb-2 text-sm text-muted-foreground">
                  Properties ({entry.properties.length})
                </h4>
                <div className="flex flex-wrap gap-1">
                  {entry.properties.slice(0, 10).map((prop) => (
                    <Badge
                      key={prop.id}
                      variant="secondary"
                      className="text-xs"
                    >
                      {prop.entity.name}
                    </Badge>
                  ))}
                  {entry.properties.length > 10 && (
                    <Badge variant="outline" className="text-xs">
                      +{entry.properties.length - 10} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Schema */}
              <div>
                <h4 className="font-semibold mb-2 text-sm text-muted-foreground">
                  Schema
                </h4>
                <div className="bg-muted rounded-md p-3 overflow-x-auto">
                  <pre className="text-sm font-mono whitespace-pre-wrap break-all">
                    {entry.schema}
                  </pre>
                </div>
              </div>

              {/* Mapping */}
              <div>
                <h4 className="font-semibold mb-2 text-sm text-muted-foreground">
                  Mapping
                </h4>
                <div className="bg-muted rounded-md p-3 overflow-x-auto">
                  <pre className="text-sm font-mono whitespace-pre-wrap break-all">
                    {entry.mapping}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEntries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No schema entries found matching "{searchTerm}"
          </p>
        </div>
      )}
    </div>
  );
}
